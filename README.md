This is the backend of my first semester project for the web development class. A pretty simple server system which handles data in the `To do list` database. 
It handles all CRUD operations (GET, POST, DELETE and PATCH http requests) and it has straight forward url routes:

    • https://localhost:8000/user/register [POST] - creates a new user, handles data in req.body (registration)

    • https://localhost:8000/user/login [POST] - authenticates  a user, handles data in req.body (login)

    • https://localhost:8000/user [GET] - gets all users from the database

    • https://localhost:8000/user/:username [GET] - gets a specific user using a username

    • https://localhost:8000/user/changeusername [PATCH] - changes the username of a user, handles data in req.body

    • https://localhost:8000/user/changepassword/:username [PATCH] - changes the password of a user, handles data in req.body

    • https://localhost:8000/user/:username [DELETE] - deletes a user from the database using a username

    • https://localhost:8000/todo [POST] - creates a new todo record, handles data in req.body 

    • https://localhost:8000/todo [GET] - gets all todo records from the database

    • https://localhost:8000/todo/:todoid [GET] - gets a todo record using an id

    • https://localhost:8000/todo/peruser/:email [GET] - gets all todos per user using an e-mail (fk)

    • https://localhost:8000/todo/favourite/:email [GET] - gets all favourite todos per user using an e-mail (fk)

    • https://localhost:8000/todo/finished/:email [GET] - gets all finished todos per user using an e-mail (fk)

    • http://localhost:8000/todo/unfinished/:email [GET] - gets all unfinished todos per user using an e-mail (fk)

    • https://localhost:8000/todo/:todoid [PATCH] - updates a todo record using an id, handles data in req.body

    • https://localhost:8000/todo/:todoid [DELETE] - delelets a todo record from the database using an id

Package depenpencies:

    • bcrypt
    • body-parser  
    • cookieparser
    • ejs
    • express
    • express-session
    • ip
    • layout
    • mysql
    • nodemon
    • path
    • router
    • serve-favicon
    • session

Server is running on port 8000, locally. https://localhost:8000/ or https:// [your ip address here]:8000/
