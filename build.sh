#!/bin/bash

sudo docker login rg.fr-par.scw.cloud/djnd -u nologin -p $SCW_SECRET_TOKEN

sudo docker build -f consul/Dockerfile -t consul-landing:latest consul
sudo docker tag consul-landing:latest rg.fr-par.scw.cloud/djnd/consul-landing:latest
sudo docker push rg.fr-par.scw.cloud/djnd/consul-landing:latest
