-- CREATE DATABASE "MotobayMaster"
--     WITH 
--     OWNER = postgres
--     ENCODING = 'UTF8'
--     CONNECTION LIMIT = -1;

-- note: always create the db first, then run 
-- the 'create extension' commands in that db query tool, not
-- in the postgres area. if you've already installed an extension,
-- you can comment out the line


CREATE EXTENSION citext;

-- ***************************
-- ***************************
-- Table: public.users
--DROP TABLE public.users;
CREATE TABLE public.users
( -- column tetris complete
    users_id BIGSERIAL PRIMARY KEY,
    password text COLLATE pg_catalog."default" NOT NULL,
    username citext COLLATE pg_catalog."default" NOT NULL,
    users_email citext COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT users_username_key UNIQUE (username),
    CONSTRAINT users_email_key UNIQUE (users_email)
)
WITH (OIDS = FALSE)
TABLESPACE pg_default;
ALTER TABLE public.users OWNER to postgres;
GRANT ALL ON TABLE public.users TO aaron;
GRANT ALL ON TABLE public.users TO postgres;
GRANT ALL ON TABLE public.users TO shan;
COMMENT ON TABLE users IS 'A table of all Motobay users.';
COMMENT ON COLUMN users.username IS 'A unique string or email for the user to use in login attempts.';
COMMENT ON COLUMN users.users_email IS 'Emails will be validated on the frontend. Here they are case insensitive and must be unique.';



-- ***************************
-- ***************************
-- Table: public.users_details
--DROP TABLE public.users_details;
CREATE TABLE public.users_details
(-- column tetris complete
    users_id_fkey bigint NOT NULL,
    users_details_signup_timestamp timestamp with time zone NOT NULL,
    CONSTRAINT users_details_pkey PRIMARY KEY (users_id_fkey),
    CONSTRAINT users_details__users_id_fkey FOREIGN KEY (users_id_fkey)
        REFERENCES public.users (users_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (OIDS = FALSE)
TABLESPACE pg_default;
ALTER TABLE public.users_details OWNER to postgres;
GRANT ALL ON TABLE public.users TO aaron;
GRANT ALL ON TABLE public.users TO postgres;
GRANT ALL ON TABLE public.users TO shan;
COMMENT ON TABLE public.users_details IS 'Table stores the timestamp of when the user joined, and any future profile information we need.';
COMMENT ON COLUMN public.users_details.users_id_fkey IS 'This column is both the primary key for the table, and a fKey to the users table in a one-to-one relationship';
-- &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
-- CREATE AN INDEX FOR users & users_details
-- update: nevermind, we dont need an index for this foreign
-- key because it is already the primary key and it's a one-to-one
-- relationship with users



-- ***************************
-- ***************************
-- Table: public.bikes_makers
-- DROP TABLE public.bikes_makers;
CREATE TABLE public.bikes_makers
(-- column tetris complete
    bikes_makers_name text COLLATE pg_catalog."default" NOT NULL,
    bikes_makers_id SERIAL2 PRIMARY KEY,
    CONSTRAINT bikes_makers_name_key UNIQUE (bikes_makers_name)
)
WITH (OIDS = FALSE)
TABLESPACE pg_default;
ALTER TABLE public.bikes_makers OWNER to postgres;
GRANT ALL ON TABLE public.bikes_makers TO aaron;
GRANT ALL ON TABLE public.bikes_makers TO postgres;
GRANT ALL ON TABLE public.bikes_makers TO shan;


-- ***************************
-- ***************************
-- Table: public.bikes_models
-- DROP TABLE public.bikes_models;
CREATE TABLE public.bikes_models
(-- column tetris complete
    bikes_models_name text COLLATE pg_catalog."default" NOT NULL,
    bikes_models_id SERIAL2 PRIMARY KEY,
    bikes_makers_id_fkey smallint NOT NULL,
    CONSTRAINT bikes_models_name_key UNIQUE (bikes_models_name)
,
    CONSTRAINT bikes_models__bikes_makers_id_fkey FOREIGN KEY (bikes_makers_id_fkey)
        REFERENCES public.bikes_makers (bikes_makers_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (OIDS = FALSE)
TABLESPACE pg_default;
ALTER TABLE public.bikes_models OWNER to postgres;
GRANT ALL ON TABLE public.bikes_models TO aaron;
GRANT ALL ON TABLE public.bikes_models TO shan;
GRANT ALL ON TABLE public.bikes_models TO postgres;
-- &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
-- CREATE AN INDEX FOR bikes_models_fkey
CREATE INDEX idx_bikes_models__bikes_makers_id_fkey ON bikes_models (bikes_makers_id_fkey);




-- ***************************
-- ***************************
-- Table: public.bikes_conditions
-- DROP TABLE public.bikes_conditions;
CREATE TABLE public.bikes_conditions
(-- column tetris complete 
    bikes_conditions_type text COLLATE pg_catalog."default" NOT NULL,
    bikes_conditions_description text COLLATE pg_catalog."default" NOT NULL,
    bikes_conditions_id SERIAL2 PRIMARY KEY,
    CONSTRAINT bikes_conditions_bikes_conditions_type_key UNIQUE (bikes_conditions_type)

)
WITH (OIDS = FALSE)
TABLESPACE pg_default;
ALTER TABLE public.bikes_conditions OWNER to postgres;
GRANT ALL ON TABLE public.bikes_conditions TO aaron;
GRANT ALL ON TABLE public.bikes_conditions TO postgres;
GRANT ALL ON TABLE public.bikes_conditions TO shan;


-- ***************************
-- ***************************
-- Table: public.bikes
-- DROP TABLE public.bikes;
CREATE TABLE public.bikes
(-- column tetris complete 
    bikes_id BIGSERIAL PRIMARY KEY,
    users_id_fkey bigint NOT NULL,
    bikes_makers_id_fkey smallint,
    bikes_models_id_fkey smallint,
    bikes_year smallint,
    transmission smallint,
    bikes_conditions_id_fkey smallint,
    CONSTRAINT bikes_details__bikes_conditions_id_fkey FOREIGN KEY (bikes_conditions_id_fkey)
        REFERENCES public.bikes_conditions (bikes_conditions_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (OIDS = FALSE)
TABLESPACE pg_default;
ALTER TABLE public.bikes OWNER to postgres;
ALTER TABLE public.bikes -- added this alter here for fun. keep in CREATE TABLE script for other constraints though.
   add CONSTRAINT bikes_year_less_than_5_digits check (bikes_year <= 2999);
GRANT ALL ON TABLE public.bikes TO aaron;
GRANT ALL ON TABLE public.bikes TO postgres;
GRANT ALL ON TABLE public.bikes TO shan;
-- &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
-- CREATE some INDEXes for bikes
CREATE INDEX idx_bikes__users_id_fkey ON bikes (users_id_fkey);
CREATE INDEX idx_bikes__bikes_models_id_fkey ON bikes (bikes_models_id_fkey);
CREATE INDEX idx_bikes__bikes_makers_id_fkey ON bikes (bikes_makers_id_fkey);
CREATE INDEX idx_bikes__bikes_conditions_id_fkey ON bikes (bikes_conditions_id_fkey);



-- ***************************
-- ***************************
-- Table: public.locations_countries
-- DROP TABLE public.locations_countries;
CREATE TABLE public.locations_countries
(-- column tetris complete 
    iso text COLLATE pg_catalog."default",
    country_name text COLLATE pg_catalog."default" NOT NULL,
    country_nicename text COLLATE pg_catalog."default",
    iso3 text COLLATE pg_catalog."default",
    three_letter_currency_code text COLLATE pg_catalog."default",
    countries_id SERIAL2 PRIMARY KEY,
    numcode smallint,
    phonecode smallint NOT NULL
)
WITH (OIDS = FALSE)
TABLESPACE pg_default;
ALTER TABLE public.locations_countries OWNER to postgres;
GRANT ALL ON TABLE public.locations_countries TO aaron;
GRANT ALL ON TABLE public.locations_countries TO postgres;
GRANT ALL ON TABLE public.locations_countries TO shan;



-- ***************************
-- ***************************
-- Table: public.locations_cities
-- DROP TABLE public.locations_cities;
CREATE TABLE public.locations_cities
(-- column tetris complete 
    locations_cities_cityname text COLLATE pg_catalog."default" NOT NULL,
    locations_cities_airportcode text COLLATE pg_catalog."default",
    locations_cities_id SERIAL PRIMARY KEY,
    locations_countries_id_fkey smallint NOT NULL,
    CONSTRAINT locations_cities_locations_cities_airportcode_key UNIQUE (locations_cities_airportcode)
,
    CONSTRAINT locations_cities__locations_countries_id_fkey FOREIGN KEY (locations_countries_id_fkey)
        REFERENCES public.locations_countries (countries_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (OIDS = FALSE)
TABLESPACE pg_default;
ALTER TABLE public.locations_cities OWNER to postgres;
GRANT ALL ON TABLE public.locations_cities TO aaron;
GRANT ALL ON TABLE public.locations_cities TO shan;
GRANT ALL ON TABLE public.locations_cities TO postgres;
-- &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
-- CREATE INDEX for cities
CREATE INDEX idx_locations_cities__users_id_fkey ON locations_cities (locations_countries_id_fkey);



-- ***************************
-- ***************************
-- Table: public.renters
-- DROP TABLE public.renters;
CREATE TABLE public.renters
(-- column tetris complete 
    renters_id BIGSERIAL PRIMARY KEY,
    users_id_fkey bigint NOT NULL,
    locations_cities_id_fkey integer NOT NULL,
    renters_isPremium boolean NOT NULL,
    CONSTRAINT renters__users_id_fkey FOREIGN KEY (users_id_fkey)
        REFERENCES public.users (users_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT renters__locations_cities_id_fkey FOREIGN KEY (locations_cities_id_fkey)
        REFERENCES public.locations_cities (locations_cities_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (OIDS = FALSE)
TABLESPACE pg_default;
ALTER TABLE public.renters OWNER to postgres;
GRANT ALL ON TABLE public.renters TO aaron;
GRANT ALL ON TABLE public.renters TO postgres;
GRANT ALL ON TABLE public.renters TO shan;
-- &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
-- CREATE INDEX for renters/users
CREATE INDEX idx_renters__users_id_fkey ON renters (users_id_fkey);

-- ***************************
-- ***************************
-- Table: public.renters_premium_log
-- DROP TABLE public.renters_premium_log;
CREATE TABLE public.renters_premium_log
(
    renters_premium_log_timestamp timestamp with time zone NOT NULL,
    renters_premium_log_id BIGSERIAL PRIMARY KEY,
    renters_id_fkey integer NOT NULL,
    renters_premium_log_isCancellation boolean NOT NULL,
    CONSTRAINT renters_premium_log__renters_id_fkey FOREIGN KEY (renters_id_fkey)
        REFERENCES public.renters (renters_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (OIDS = FALSE)
TABLESPACE pg_default;
ALTER TABLE public.renters_premium_log OWNER to postgres;
GRANT ALL ON TABLE public.renters TO aaron;
GRANT ALL ON TABLE public.renters TO postgres;
GRANT ALL ON TABLE public.renters TO shan;
-- &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
-- CREATE INDEX for renters/users
CREATE INDEX idx_renters_premium__renters_id_fkey ON renters_premium_log (renters_id_fkey);

-- ***************************
-- ***************************
-- Table: public.renters_details
-- DROP TABLE public.renters_details;
CREATE TABLE public.renters_details
(
    renters_details_id SERIAL PRIMARY KEY,
    renters_id_fkey integer NOT NULL,
    renter_email_primary text COLLATE pg_catalog."default" NOT NULL,
    renter_email_secondary text COLLATE pg_catalog."default",
    CONSTRAINT renters_details__renters_id_fkey FOREIGN KEY (renters_id_fkey)
        REFERENCES public.renters (renters_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (OIDS = FALSE)
TABLESPACE pg_default;
ALTER TABLE public.renters_details OWNER to postgres;
GRANT ALL ON TABLE public.renters_details TO aaron;
GRANT ALL ON TABLE public.renters_details TO postgres;
GRANT ALL ON TABLE public.renters_details TO shan;
-- &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
-- CREATE INDEX for renters
CREATE INDEX idx_renters_detials__renters_id_fkey ON renters_details (renters_id_fkey);


-- ***************************
-- ***************************
-- Table: public.stores
-- We need to enable PostGIS (includes raster)

CREATE EXTENSION postgis;

-- DROP TABLE public.stores;
CREATE TABLE public.stores
(
    stores_id BIGSERIAL PRIMARY KEY,
    renters_id_fkey integer NOT NULL,
    locations_cities_id_fkey integer NOT NULL,
    stores_geography_coordinates geography,
    CONSTRAINT stores__renters_id_fkey FOREIGN KEY (renters_id_fkey)
        REFERENCES public.renters (renters_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT stores__locations_cities_id_fkey FOREIGN KEY (locations_cities_id_fkey)
        REFERENCES public.locations_cities (locations_cities_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (OIDS = FALSE) TABLESPACE pg_default;
ALTER TABLE public.stores OWNER to postgres;
GRANT ALL ON TABLE public.stores TO aaron;
GRANT ALL ON TABLE public.stores TO postgres;
GRANT ALL ON TABLE public.stores TO shan;
-- &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
-- CREATE INDEX for renters
CREATE INDEX idx_stores__renters_id_fkey ON stores (renters_id_fkey);
CREATE INDEX idx_stores__locations_cities_id_fkey ON stores (locations_cities_id_fkey);
create index on stores using gist (stores_geography_coordinates);
-- to insert into your_table (stores_geography_coordinates) values ('SRID=4326;POINT(longitude latitude)');
-- to query 5 stores nearest a point select * from stores order by stores_geography_coordinates <-> 'SRID=4326;POINT(lon lat)' limit 5;


-- ***************************
-- ***************************
-- Table: public.stores_signin
-- DROP TABLE public.stores_signin;
CREATE TABLE public.stores_signin
(
    stores_signin_id SERIAL PRIMARY KEY,
    stores_id_fkey integer NOT NULL,
    stores_signin_password text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT stores_signin__stores_id_fkey FOREIGN KEY (stores_id_fkey)
        REFERENCES public.stores (stores_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (OIDS = FALSE) TABLESPACE pg_default;
ALTER TABLE public.stores_signin OWNER to postgres;
GRANT ALL ON TABLE public.stores TO aaron;
GRANT ALL ON TABLE public.stores TO postgres;
GRANT ALL ON TABLE public.stores TO shan;
-- &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
-- CREATE INDEX for stores_id_fkey
CREATE INDEX idx_stores_signin__stores_id_fkey ON stores_signin (stores_id_fkey);



-- ***************************
-- ***************************
-- Table: public.stores_details
-- DROP TABLE public.stores_details;
CREATE TABLE public.stores_details
( 
    store_name text COLLATE pg_catalog."default" NOT NULL,
    store_address text COLLATE pg_catalog."default" NOT NULL,
    store_phone text COLLATE pg_catalog."default" NOT NULL,
    store_website text COLLATE pg_catalog."default",
    store_description text COLLATE pg_catalog."default",
    stores_details_email text COLLATE pg_catalog."default" NOT NULL,
    stores_details_id BIGSERIAL PRIMARY KEY,
    locations_countries_id_fkey integer NOT NULL,
    stores_id_fkey integer NOT NULL,
    stores_details_phone_country_code integer,
    stores__details_hours_start smallint,
    stores_details_hours_end smallint,
    CONSTRAINT stores_details__locations_countries_id_fkey FOREIGN KEY (locations_countries_id_fkey)
        REFERENCES public.locations_countries (countries_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT stores_details__stores_id_fkey FOREIGN KEY (stores_id_fkey)
        REFERENCES public.stores (stores_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (OIDS = FALSE) TABLESPACE pg_default;
ALTER TABLE public.stores_details OWNER to postgres;
GRANT ALL ON TABLE public.stores_details TO aaron;
GRANT ALL ON TABLE public.stores_details TO postgres;
GRANT ALL ON TABLE public.stores_details TO shan;
-- &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
-- CREATE INDEX for stores_id_fkey, etc
CREATE INDEX idx_stores_details__stores_id_fkey ON stores_details (stores_id_fkey);
CREATE INDEX idx_stores_details__locations_countries_id_fkey ON stores_details (locations_countries_id_fkey);





-- ***************************
-- ***************************
-- Table: public.bikes_rentals
-- DROP TABLE public.bikes_rentals;
CREATE TABLE public.bikes_rentals
(-- column tetris complete 
    bikes_rentals_id BIGSERIAL PRIMARY KEY,
    bikes_id_fkey bigint NOT NULL,
    bikes_rentals_pricePerDay bigint NOT NULL,
    bikes_rentals_pricePerWeek bigint NOT NULL,
    bikes_rentals_pricePerMonth bigint NOT NULL,
    renters_id_fkey integer NOT NULL,
    stores_id_fkey integer NOT NULL,
    bikes_rentals_isAvailable boolean NOT NULL,
    CONSTRAINT bikes_rentals__bikes_id_fkey FOREIGN KEY (bikes_id_fkey)
        REFERENCES public.bikes (bikes_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT bikes_rentals__renters_id_fkey FOREIGN KEY (renters_id_fkey)
        REFERENCES public.renters (renters_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT bikes_rentals__stores_id_fkey FOREIGN KEY (stores_id_fkey)
        REFERENCES public.stores (stores_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (OIDS = FALSE) TABLESPACE pg_default;
ALTER TABLE public.bikes_rentals OWNER to postgres;
GRANT ALL ON TABLE public.bikes_rentals TO aaron;
GRANT ALL ON TABLE public.bikes_rentals TO shan;
GRANT ALL ON TABLE public.bikes_rentals TO postgres;
-- &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
-- CREATE INDEX for fkeys 
CREATE INDEX idx_bikes_r__bikes_id_fkey ON bikes_rentals (bikes_id_fkey);
CREATE INDEX idx_bikes_r__renters_id_fkey ON bikes_rentals (renters_id_fkey);
CREATE INDEX idx_bikes_r__stores_id_fkey ON bikes_rentals (stores_id_fkey);
CREATE INDEX idx_bikes_r__bikes_r_pricePerWeek ON bikes_rentals (bikes_rentals_pricePerWeek); -- this index is for query filters on bikes less than a $ amount. doublecheck if that creates a performance boost on the query





-- ***************************
-- ***************************
-- Table: public.rental_contracts
-- DROP TABLE public.rental_contracts;
CREATE TABLE public.rental_contracts
(
    rental_contracts_id BIGSERIAL PRIMARY KEY,
    bikes_rentals_id_fkey bigint NOT NULL,
    renters_id_fkey integer NOT NULL,
    users_id_fkey bigint NOT NULL,
    stores_id_fkey integer NOT NULL,
    CONSTRAINT rental_contracts__bikes_rentals_id_fkey FOREIGN KEY (bikes_rentals_id_fkey)
        REFERENCES public.bikes_rentals (bikes_rentals_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT rental_contracts__renters_id_fkey FOREIGN KEY (renters_id_fkey)
        REFERENCES public.renters (renters_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT rental_contracts__stores_id_fkey FOREIGN KEY (stores_id_fkey)
        REFERENCES public.stores (stores_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT rental_contracts__users_id_fkey FOREIGN KEY (users_id_fkey)
        REFERENCES public.users (users_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (OIDS = FALSE) TABLESPACE pg_default;
ALTER TABLE public.rental_contracts OWNER to postgres;
GRANT ALL ON TABLE public.rental_contracts TO aaron;
GRANT ALL ON TABLE public.rental_contracts TO shan;
GRANT ALL ON TABLE public.rental_contracts TO postgres;
-- &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
-- CREATE INDEX for fkeys 
CREATE INDEX idx_rental_contracts__bikes_rent_id_fkey ON rental_contracts (bikes_rentals_id_fkey);
CREATE INDEX idx_rental_contracts__renters_id_fkey ON rental_contracts (renters_id_fkey);
CREATE INDEX idx_rental_contracts__stores_id_fkey ON rental_contracts (stores_id_fkey);
CREATE INDEX idx_rental_contracts__users_id_fkey ON rental_contracts (users_id_fkey); -- this index is for query filters on bikes less than a $ amount. doublecheck if that creates a performance boost on the query

-- ***************************
-- ***************************
-- Table: public.rental_contracts_payments_status
-- DROP TABLE public.rental_contracts_payments_status;
CREATE TABLE public.rental_contracts_payments_status
(
    rental_contracts_payments_status_id SERIAL2 PRIMARY KEY,
    rental_contracts_payments_status_name text COLLATE pg_catalog."default" NOT NULL,
    rental_contracts_payments_status_description text COLLATE pg_catalog."default"
)
WITH (OIDS = FALSE) TABLESPACE pg_default;
ALTER TABLE public.rental_contracts_payments_status OWNER to postgres;
GRANT ALL ON TABLE public.rental_contracts_payments_status TO aaron;
GRANT ALL ON TABLE public.rental_contracts_payments_status TO postgres;
GRANT ALL ON TABLE public.rental_contracts_payments_status TO shan;

-- ***************************
-- ***************************
-- Table: public.rental_contracts_dates
-- DROP TABLE public.rental_contracts_dates;
CREATE TABLE public.rental_contracts_dates
(
    rental_contracts_dates_id BIGSERIAL PRIMARY KEY,
    rental_contracts_id_fkey bigint NOT NULL,
    rental_contracts_dates_timestamp timestamp with time zone NOT NULL,
    rental_contracts_dates_startdate date  NOT NULL,
    rental_contracts_dates_enddate date NOT NULL,
    rental_contracts_dates_payments_dateReceived date,
    rental_contracts_dates_price_per_day bigint,
    rental_contracts_dates_total_price_of_dates bigint,
    rental_contracts_dates_num_of_days smallint,
    rental_contracts_payments_status_id_fkey smallint NOT NULL,
    rental_contracts_dates_isExtension boolean,
    rental_contracts_dates_isOwnerApproved boolean,
    rental_contracts_dates_isRenterApproved boolean,
    rental_contracts_dates_isPaidFinalCheck boolean NOT NULL, -- run batch processes after the transaction to verify
    CONSTRAINT r_contracts_dates__r_contracts_id_fkey FOREIGN KEY (rental_contracts_id_fkey)
        REFERENCES public.rental_contracts (rental_contracts_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT r_contracts_dates_r_contracts_paym_status_id_fkey FOREIGN KEY (rental_contracts_payments_status_id_fkey)
        REFERENCES public.rental_contracts_payments_status (rental_contracts_payments_status_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (OIDS = FALSE)
TABLESPACE pg_default;
ALTER TABLE public.rental_contracts_dates OWNER to postgres;
GRANT ALL ON TABLE public.rental_contracts_dates TO aaron;
GRANT ALL ON TABLE public.rental_contracts_dates TO postgres;
GRANT ALL ON TABLE public.rental_contracts_dates TO shan;
-- &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
-- CREATE INDEX for fkeys 
CREATE INDEX idx_r_contracts_paym_status__r_contracts_id_fkey ON rental_contracts_dates (rental_contracts_id_fkey);
CREATE INDEX idx_r_contracts_paym_status__paym_status_id_fkey ON rental_contracts_dates (rental_contracts_payments_status_id_fkey);




-- ***************************
-- ***************************
-- Table: public.rental_contracts_partial_refunds
-- DROP TABLE public.rental_contracts_partial_refunds;
CREATE TABLE public.rental_contracts_partial_refunds
(
    rental_contracts_partial_refunds_id BIGSERIAL PRIMARY KEY,
    rental_contracts_id_fkey bigint NOT NULL,
    rental_contracts_partial_refunds_amount bigint NOT NULL,
    CONSTRAINT r_contracts_part_refunds__r_contracts_id_fkey FOREIGN KEY (rental_contracts_id_fkey)
        REFERENCES public.rental_contracts (rental_contracts_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (OIDS = FALSE) TABLESPACE pg_default;
ALTER TABLE public.rental_contracts_partial_refunds OWNER to postgres;
GRANT ALL ON TABLE public.rental_contracts_partial_refunds TO aaron;
GRANT ALL ON TABLE public.rental_contracts_partial_refunds TO postgres;
GRANT ALL ON TABLE public.rental_contracts_partial_refunds TO shan;
-- &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
-- CREATE INDEX for fkeys 
CREATE INDEX idx_r_contracts_part_refunds__r_contract_id_fkey ON rental_contracts_partial_refunds (rental_contracts_id_fkey);


-- ***************************
-- ***************************
-- Table: public.rental_contracts_coupon_codes
-- DROP TABLE public.rental_contracts_coupon_codes;
CREATE TABLE public.rental_contracts_coupon_codes -- // code works on frontend only and update per the rental_contracts_dates_total_price_of_dates 
(
    rental_contracts_coupon_codes_id BIGSERIAL PRIMARY KEY,
    rental_contracts_coupon_codes_validUntil date NOT NULL,
    rental_contracts_coupon_codes_code text NOT NULL,
    rental_contracts_coupon_codes_three_letter_currency_code text,
    rental_contracts_coupon_codes_amount integer NOT NULL,
    rental_contracts_coupon_codes_isPercent boolean NOT NULL
)
WITH (OIDS = FALSE) TABLESPACE pg_default;
ALTER TABLE public.rental_contracts_coupon_codes OWNER to postgres;
GRANT ALL ON TABLE public.rental_contracts_coupon_codes TO aaron;
GRANT ALL ON TABLE public.rental_contracts_coupon_codes TO postgres;
GRANT ALL ON TABLE public.rental_contracts_coupon_codes TO shan;