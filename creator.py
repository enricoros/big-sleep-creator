from flask import Flask, render_template
from flask_socketio import SocketIO
from big_sleep import Imagine
import fire
import torch

# default options, overridable from the command line
default_http_address = '127.0.0.1'
default_http_port = 1337


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


# Main()
def run_app(http_host=default_http_address, http_port=default_http_port):
    # configure Flask for serving
    print('# Starting HTTP endpoint on ' + http_host + ':' + str(http_port))
    app = Flask(__name__)
    app.logger.setLevel(20)
    print()

    # test out app functionality at start
    initial_test()

    # start sever
    socket_io = SocketIO(app)
    socket_io.run(app, host=http_host, port=http_port)


if __name__ == '__main__':
    fire.Fire(run_app)
