FROM node:14

# Create app directory
WORKDIR /app

# expose port 3000
EXPOSE 3000

# docker entrypoint
ENTRYPOINT ["./docker/docker-entrypoint.sh"]

# npm run dev
CMD [ "npm", "run", "dev" ]
