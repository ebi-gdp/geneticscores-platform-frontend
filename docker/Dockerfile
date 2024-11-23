ARG TARGET_PLATFORM
FROM --platform=${TARGET_PLATFORM} nginx:1.20.2-alpine

# needed this to make React Router work properly
RUN rm /etc/nginx/conf.d/default.conf
COPY build/ /usr/share/nginx/html
COPY /nginx/nginx.conf /etc/nginx/conf.d

# Expose port 3000 for HTTP Traffic
EXPOSE 3000

# start the nginx web server
CMD ["nginx", "-g", "daemon off;"]
