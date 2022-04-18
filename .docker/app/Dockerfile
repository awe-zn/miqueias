FROM php:8-fpm

WORKDIR /var/www

RUN apt-get update

RUN apt-get install -y git
RUN apt-get install -y zip
RUN apt-get install -y libfreetype6-dev
RUN apt-get install -y libjpeg62-turbo-dev
RUN apt-get install -y libpng-dev
RUN apt-get install -y build-essential
RUN apt-get install -y libcurl4-openssl-dev
RUN apt-get install -y libmagickwand-dev
RUN apt-get install -y libsodium-dev
RUN apt-get install -y libzip-dev
RUN apt-get install -y libpq-dev
RUN apt-get install -y locales
RUN apt-get install -y curl
RUN apt-get install -y apt-utils
RUN apt-get install -y software-properties-common
RUN apt-get install -y gnupg
RUN apt-get install -y libpng-dev
RUN apt-get install -y libwebp-dev
RUN apt-get install -y libxpm-dev
RUN docker-php-ext-configure gd --with-freetype --with-jpeg
RUN docker-php-ext-install -j$(nproc) gd
RUN docker-php-ext-install -j$(nproc) iconv
RUN docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql

RUN docker-php-ext-install exif
RUN docker-php-ext-enable exif

RUN pecl install imagick
RUN docker-php-ext-enable imagick

RUN docker-php-ext-install calendar zip pdo pdo_pgsql

RUN pecl install xdebug
RUN docker-php-ext-enable xdebug

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN echo "max_file_uploads=100" >> /usr/local/etc/php/conf.d/docker-php-ext-max_file_uploads.ini
RUN echo "post_max_size=120M" >> /usr/local/etc/php/conf.d/docker-php-ext-post_max_size.ini
RUN echo "upload_max_filesize=120M" >> /usr/local/etc/php/conf.d/docker-php-ext-upload_max_filesize.ini

ENV DEBIAN_FRONTEND noninteractive

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash
RUN apt-get install -y nodejs
RUN npm install -g yarn -y

RUN groupadd -g 1000 www
RUN useradd -u 1000 -ms /bin/bash -g www www

COPY . /var/www

COPY --chown=www:www . /var/www

USER www

EXPOSE 9000
CMD ["php-fpm"]
