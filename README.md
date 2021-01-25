# Big-sleep Creator
UI for human-in-the-loop controlled image synthesis

Planned features:
* Generation of images based on text
* Hyperparameters control
* Scatter/select creation, with progressive refinement
* Branch/continue generation of images (tree of creation)
* Latent space editing
* Latent space constraining for continuation
* More? post your ideas here!

## Examples
...

## Usage 
...

## Installation

### Big-sleep server
The server is meant to be installed in machines (even remote) that have a
10 GB+ GPU and do not need to have a user interface. In case of local installs
both the server, and the UI can run on the same machine.

```shell
# create a virtual environment if needed (we assume you know how to do it)
# install PyTorch for your CUDA version - example below (windows, PyTorch 1.7.1 for CUDA 11.0)
pip install torch===1.7.1+cu110 torchvision===0.8.2+cu110 torchaudio===0.7.2 -f https://download.pytorch.org/whl/torch_stable.html
pip install -r requirements.txt
```

#### Prerequisites
For now this has been tested and verified ont the following configurations:

| OS | GPU Config | PyTorch | Working | 
| --- | --- | --- | --- |
| Windows 10 | CUDA 11.0 + cuDNN 11.0 | 1.7.1 (CUDA 11.0) | Yes |

### Big-sleep UI
This 'React' APP can be built and served by any web server, and will use
'socket.io' websockets to connect anc control the server.

...
