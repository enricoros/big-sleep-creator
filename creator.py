from threading import Lock

import eventlet
from flask import Flask, render_template
from flask_socketio import SocketIO, emit
import fire

# focused imports
from big_sleep import Imagine
import torch

# default options, overridable from the command line
GPU_IDX = 0
default_http_address = '127.0.0.1'
default_http_port = 5000
default_big_sleep_hyper_params = {
    'text': "a bp",
    'lr': .07,
    'image_size': 512,
    'gradient_accumulate_every': 4,
    'epochs': 20,
    'iterations': 1050,
    'save_every': 50,
    'overwrite': False,
    'save_progress': False,
    'bilinear': False,
    'open_folder': True,
    'seed': 0,
    'torch_deterministic': False,
}

# eventlet patching to improve coroutine compatibility
eventlet.monkey_patch()


def initial_test():
    text = 'puppy with purple eyes'
    imagine = Imagine(
        text=text,
        lr=.07,
        save_every=10,
        open_folder=True,
        epochs=1,
        iterations=10,
        bilinear=False,
        image_size=256,
        save_progress=True,
        seed=False,
        torch_deterministic=False,
    )
    imagine()
    imagine.reset()
    del imagine.model
    del imagine.optimizer
    del imagine


class State:
    def __init__(self):
        self.busy = False
        self.connections_count = 0

    def set_busy(self, busy):
        self.busy = busy
        emit('@status:server', self.message_server_status())

    def update_connections(self, adj):
        self.connections_count += adj
        emit('@status:server', self.message_server_status())

    def message_server_status(self):
        gpu_properties = torch.cuda.get_device_properties(GPU_IDX)
        # COPY ui type definition (ServerStatus)
        return {
            'busy': self.busy,
            'clientsCount': self.connections_count,
            'gpuNumber': GPU_IDX,
            'gpuName': gpu_properties.name,
            'gpuTotal': gpu_properties.total_memory,
        }


# globals
state = State()


# Main()
def run_app(http_host=default_http_address, http_port=default_http_port, skip_test=False):
    # configure Flask for serving
    print(f'# Starting HTTP endpoint on {http_host}:{http_port}')
    app = Flask(__name__, template_folder='static-site')
    app.logger.setLevel(20)
    socket_io = SocketIO(app, async_mode='eventlet', logger=True, engineio_logger=True, cors_allowed_origins='*')
    print(f' - socket.io in async mode: {socket_io.async_mode}, options: {socket_io.server_options}')
    print()

    # test out app functionality at start
    if not skip_test:
        initial_test()

    @app.route('/')
    def index():
        return render_template('index.html')

    @socket_io.on('connect')
    def client_connected():
        state.update_connections(+1)
        print(f'Client {state.connections_count} connected')

    @socket_io.on('disconnect')
    def client_disconnected():
        state.update_connections(-1)
        print(f'Client disconnected ({state.connections_count} left)')

    @socket_io.on('@admin:clear_busy')
    def admin_clear_busy():
        print('admin_clear_busy: ADMIN override')
        state.set_busy(False)

    mutex = Lock()

    @socket_io.on('@dream:new')
    def dream_new(json):
        mutex.acquire()
        print('a')
        state.set_busy(True)
        print('b')
        input_text = json['text']
        print('c')
        imagine = Imagine(
            text=input_text,
            lr=.07,
            open_folder=False,
            epochs=1,
            iterations=10,
            bilinear=False,
            image_size=256,
            save_every=10,
            save_progress=True,
            seed=False,
            torch_deterministic=False,
        )
        print('d')
        imagine()
        print('e')
        state.set_busy(False)
        print('f')
        mutex.release()
        print('g')

    # start sever
    socket_io.run(app, host=http_host, port=http_port)


# Main
assert torch.cuda.is_available(), 'CUDA must be available in order to use Deep Daze'
if __name__ == '__main__':
    fire.Fire(run_app)
