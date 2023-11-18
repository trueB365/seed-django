# Create-a-porn-site-in-simple-way


### How to run ?
- 配置好个人的数据库配置,然后运行以下三个命令。就ok了
-  `python  manage.py migrate` 
-  `python   crawler.py`
- `python manage.py runserver`


### Create super user
Run the following the command

```sh
python manage.py createsuperuser --username=[admin_user] --email=[admin_email]
```