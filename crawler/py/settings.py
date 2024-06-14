import os
import dj_database_url

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Database
# https://docs.djangoproject.com/en/4.0/ref/settings/#databases
db_config = dj_database_url.config(
    default="postgres://testinvestment:Kt7NvcwtMXkNPbi@localhost:5432/porn",
    ssl_require=False,
)
db_config["ATOMIC_REQUESTS"] = True
db_config["ENGINE"] = "django.db.backends.postgresql"

DATABASES = {"default": db_config}

# Application definition
INSTALLED_APPS = ["app"]

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "p24^hmaq@ehty)ys$=e@4p$yehfl+lbsa7h1zn6xm@8vh^c%do"


