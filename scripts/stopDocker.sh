if [ "$(docker ps -q)" ]; then
    docker stop $(docker ps -a -q);
    docker rm $(docker ps -a -q);
fi