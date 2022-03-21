#!/bin/bash

sudo docker login rg.fr-par.scw.cloud/djnd -u nologin -p $SCW_SECRET_TOKEN

sudo docker build -f parlameter/Dockerfile -t parlameter-landing:latest parlameter-landing
sudo docker tag parlameter-landing:latest rg.fr-par.scw.cloud/djnd/parlameter-landing:latest
sudo docker push rg.fr-par.scw.cloud/djnd/parlameter-landing:latest