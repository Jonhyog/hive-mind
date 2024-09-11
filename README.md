When running docker commands, be sure to run with `sudo` or assure you are running with required user permissions 

### Instalation

#### Option 1

* Run `docker-compose build` to build the images
* Run `docker-compose up` to initializate the containers

#### Option 2

* Run `docker-compose up --build`  

### Update Images

* Make the changes
* Run `docker-compose down`
* Run `docker-compose up`

### Developing

* There is no need to rebuild the images after each change, since all the code inside the containers is being hot-reloaded in real time. In case your changes aren't being reflected, be sure to check they are inside the volumes defined in docker-compose.

### Troubleshoot

* Trying to `docker-compose up --build` containers that already exist will result in the following error. To solve this issue run `docker-compose down`  
```
...

  File "/usr/lib/python3/dist-packages/compose/service.py", line 960, in _build_container_volume_options
    binds, affinity = merge_volume_bindings(
  File "/usr/lib/python3/dist-packages/compose/service.py", line 1548, in merge_volume_bindings
    old_volumes, old_mounts = get_container_data_volumes(
  File "/usr/lib/python3/dist-packages/compose/service.py", line 1579, in get_container_data_volumes
    container.image_config['ContainerConfig'].get('Volumes') or {}
KeyError: 'ContainerConfig'
```