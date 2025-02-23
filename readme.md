I started learning backend in november, first 2 months were on and off but jan and feb i locked in and really got to "complete" it. Nothing is really ever complete, when i look at some controller i can think of lots of possibilities to make it more optimised, or edit some model to reduce one db call in some controller... and the list goes on... Few are listed below that are at the top of my head. 

# YouTube-like Backend API

[![Postman Documentation](https://img.shields.io/badge/API_Docs-Postman-FF6F37?logo=postman)](https://documenter.getpostman.com/view/39429557/2sAYdcrC5h)

## Core Features
- Video upload/streaming endpoints
- Comment system with threading
- Like/dislike functionality
- View counter system
- User subscription management

## TODO (someday......)
- [ ] Add Cloudinary file deletion support
- [ ] Migrate from Multer to client-side upload
  - Generate signed URLs for direct-to-cloud uploads
  - Implement pre-signed URL generation endpoint
  - Add client-side upload handling
- [ ] setup a cron job to update views/like numbers on videos/tweets/comments

- [ ] https://www.reddit.com/r/microservices/comments/8vknrv/comment/e1o9e2c/ 
