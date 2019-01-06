import psycopg2
from config import config
import random


# # First, connect to the PostgreSQL database server 
# # by calling the connect() function of the psycopg module.
# conn = psycopg2.connectconnect(host="localhost:5432",database="motobayDB", user="shan", password="kembo123!")
# # The connect() function returns a new instance of the connection class.
# # Next, create a new cursor object by calling the cursor() method of the connection object.
# cur = conn.cursor()
# # Then, execute the INSERT statement with the input values by calling the execute() method of the cursor object.
# # You pass the INSERT statement to the first parameter and a list of values to the second parameter of the execute() method.
# cur.execute(sql, (value1,value2))
# # In case the primary key of the table is an auto-generated column, you can get the generated ID back after inserting the row. To do this, in the INSERT statement, you use the RETURNING id clause. After calling the execute() method, you call the  fetchone() method of the cursor object to get the id value as follows:
# id = cur.fetchone()[0]
# # After that, call the commit() method of the connection object to save the changes to the database permanently. If you forget to call the commit() method, psycopg will not change anything to the database.
# conn.commit()
# # Finally, close the communication with the PostgreSQL database server by calling the close() method of the cursor and connection objects.
# cur.close()
# conn.close()

def generateRandomUsername():
    namesList1 = [
        'Shan',
        'Aaron',
        'Jon',
        'Palmtrees',
        'Pantheon',
        'BubbaJ',
        'CurlyQ',
        'EntitledMillenial',
        'Juggernaut',
        'Nguyen',
        'Huong',
        'JerseyShore',
        'DupersDelight',
        'Lollipop',
        'Motorbike',
        'Wheelie'
    ]
    namesList2 = [
        'QT',
        '_Bub',
        'Guy',
        'Girl',
        'Dude',
        'Moto',
        'Exhaust',
        '150cc',
        'Driver',
        'Flex'
    ]

    name = namesList1[random.randint(1,len(namesList1)-1)]
    name = name + namesList2[random.randint(1,len(namesList2)-1)]
    name = name + str(random.randint(1,9999))
    print('username: ' + name)
    return name

def generateRandomBikeManufacturerFKey():
    # assumes the following INSERT:
    # INSERT INTO ... VALUES ('Yamaha'),('Honda'),('BMW'),('Kawasaki'),('Suzuki'),('Aprilla'),('Daelim'),('Janus'),('Vespa');
    makers_id = [1,2,3,4,5,6,7,8]
    return makers_id[random.randint(1,len(makers_id)-1)]

def generateRandomBikeModelFKey(maker_fkey):
    if(maker_fkey == 1):
        # yamaha
        return random.randint(1,4)
    if(maker_fkey == 2):
        # honda
        return random.randint(5,10)
    return random.choice([1,2,1,2,1,2,11,12])

def getRandomCoordinatesInVnOrThai(city_fkey):
    # this works on inserts:
    # ST_GeomFromText('POINT(-71.060316 48.432044)')
    if(city_fkey==1):
        # coordinates in danang
        rand_variance_lat = random.randint(6033,7476)
        rand_variance_long = random.randint(1001,2428)
        return 'POINT(108.' + str(rand_variance_long) + ' 16.0' + str(rand_variance_lat) + ')'
    if(city_fkey==2):
        # coordinates in saigon
        rand_variance_lat = random.randint(3311,9999)
        rand_variance_long = random.randint(3001,6668)
        return 'POINT(106.' + str(rand_variance_long) + ' 10.7' + str(rand_variance_lat) + ')'
    if(city_fkey==3):
        # coordinates in bangkok
        rand_variance_lat = random.randint(5955,7563)
        rand_variance_long = random.randint(4555,5100)
        return 'POINT(100.' + str(rand_variance_long) + ' 13.0' + str(rand_variance_lat) + ')'

def getRandoStoreName():
    listOfAdjectives = [
        'Fast','Happy','Quick','Speedy','EZ','Hot','Fire','Beach','White','Red','Friendly','Kool', 'VIP'
    ]
    listOfNouns = [
        'Rabbit','Dragon','Bike','Bamboo','Moto','Shop','Panda','Adventures'
    ]
    randoAdj = listOfAdjectives[random.randint(0, len(listOfAdjectives)-1)]
    randoNoun = listOfNouns[random.randint(0, len(listOfNouns)-1)]
    return randoAdj + ' ' + randoNoun + ' Rentals'

def getStorePhoneString():
    return str(random.randint(1234567, 987654321))

def getRandoStoreEmail(storename):
    
    return storename.replace(" ", "") + '@test.com'

def getRandoStoreAddress():
    streetnum = random.randint(13,99999)
    streetname = 'Main Street'
    areacode = random.randint(24777,98999)
    return str(streetnum) + ' ' + streetname + ', ' + str(areacode)
  
def getRandoCity(sql_vals):
    # """ insert a new user into the users table """
    sql_query = """SELECT locations_cities_id
             FROM locations_cities
             WHERE locations_countries_id_fkey = %s
             """
    conn = None
    random_city = None
    try:
        # read database configuration
        params = config()
        # connect to the PostgreSQL database
        conn = psycopg2.connect(**params)
        # create a new cursor
        cur = conn.cursor()
        # execute the SELECT statement
        cur.execute(sql_query, sql_vals)
        
        # get the rows back
        rows = cur.fetchall()
        randomIndex = random.randint(1,(len(rows)-1))
        random_city = rows[randomIndex][0]
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error) # print exception details
    finally:
        if conn is not None:
            conn.close()
    print('random random_city for store: ' + str(random_city))
    return random_city

def getRandoBikeCondition():
     # """ insert a new user into the users table """
    sql_query = """SELECT bikes_conditions_id
             FROM bikes_conditions
             """
    conn = None
    random_condition_id = None
    try:
        # read database configuration
        params = config()
        # connect to the PostgreSQL database
        conn = psycopg2.connect(**params)
        # create a new cursor
        cur = conn.cursor()
        # execute the SELECT statement
        cur.execute(sql_query)
        
        # get the rows back
        rows = cur.fetchall()
        randomIndex = random.randint(1,(len(rows)-1))
        random_condition_id = rows[randomIndex][0]
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error) # print exception details
    finally:
        if conn is not None:
            conn.close()
    print('random condition_id for bike: ' + str(random_condition_id))
    return random_condition_id

def getRandoYear():
    return random.randint(1970, 2019)

def getRandoTransmission():
    return random.randint(1,3)

def getRandoRentBikePrice():
    base = random.choice([95000,100000,105000,110000,115000,112000])
    perWeek = (base * 7) - 75000
    perMonth = (base * 24)
    return base, perWeek, perMonth

def insert_user(sql_vals):
    # """ insert a new user into the users table """
    sql_query = """INSERT INTO users(username,users_password,users_email)
             VALUES (%s, %s, %s) RETURNING users_id;
             """
    conn = None
    user_id = None
    try:
        # read database configuration
        params = config()
        # connect to the PostgreSQL database
        conn = psycopg2.connect(**params)
        # create a new cursor
        cur = conn.cursor()
        # execute the INSERT statement
        cur.execute(sql_query, sql_vals)
        # get the generated id back
        user_id = cur.fetchone()[0]
        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error) # print exception details
    finally:
        if conn is not None:
            conn.close()
    print('users_id: ' + str(user_id))
    return user_id

def insert_user_details(sql_vals):
    # """ insert a new user into the users table """
    sql_query = """INSERT INTO users_details(users_id_fkey, users_details_signup_timestamp)
             VALUES (%s, current_timestamp) RETURNING users_id_fkey;
             """
    conn = None
    users_details_id = None
    try:
        # read database configuration
        params = config()
        # connect to the PostgreSQL database
        conn = psycopg2.connect(**params)
        # create a new cursor
        cur = conn.cursor()
        # execute the INSERT statement
        cur.execute(sql_query, sql_vals)
        # get the generated id back
        users_details_id = cur.fetchone()[0]
        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error) # print exception details
    finally:
        if conn is not None:
            conn.close()
    print('users_details_id: ' + str(users_details_id))
    return users_details_id

def insert_bike(sql_vals):
    # """ insert a new user into the users table """
    sql_query = """INSERT INTO bikes(users_id_fkey, 
                                    bikes_makers_id_fkey, 
                                    bikes_models_id_fkey, 
                                    bikes_year, 
                                    transmission,
                                    bikes_conditions_id_fkey)
             VALUES (%s,%s,%s,%s,%s,%s) RETURNING bikes_id;
             """
    conn = None
    bike_id = None
    try:
        # read database configuration
        params = config()
        # connect to the PostgreSQL database
        conn = psycopg2.connect(**params)
        # create a new cursor
        cur = conn.cursor()
        # execute the INSERT statement
        cur.execute(sql_query, sql_vals)
        # get the generated id back
        bike_id = cur.fetchone()[0]
        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error) # print exception details
    finally:
        if conn is not None:
            conn.close()
    print('bike_id: ' + str(bike_id))
    return bike_id

def insert_bike_details(sql_vals):
    # """ insert a new user into the users table """
    sql_query = """INSERT INTO bikes_details(bikes_id_fkey, bikes_makers_id_fkey, bikes_conditions_id_fkey, year, transmission)
             VALUES (%s,%s, %s, %s, %s) RETURNING bikes_details_id;
             """
    conn = None
    bikes_details_id = None
    try:
        # read database configuration
        params = config()
        # connect to the PostgreSQL database
        conn = psycopg2.connect(**params)
        # create a new cursor
        cur = conn.cursor()
        # execute the INSERT statement
        cur.execute(sql_query, sql_vals)
        # get the generated id back
        bikes_details_id = cur.fetchone()[0]
        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error) # print exception details
    finally:
        if conn is not None:
            conn.close()
    print('bikes_details_id: ' + str(bikes_details_id))
    return bikes_details_id

def insert_renter(sql_vals):
    # """ insert a new user into the users table """
    sql_query = """INSERT INTO renters(users_id_fkey,locations_cities_id_fkey,renters_isPremium)
             VALUES (%s,%s,False) RETURNING renters_id;
             """
    conn = None
    renter_id = None
    try:
        # read database configuration
        params = config()
        # connect to the PostgreSQL database
        conn = psycopg2.connect(**params)
        # create a new cursor
        cur = conn.cursor()
        # execute the INSERT statement
        cur.execute(sql_query, sql_vals)
        # get the generated id back
        renter_id = cur.fetchone()[0]
        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error) # print exception details
    finally:
        if conn is not None:
            conn.close()
    print('renters_id: ' + str(renter_id))
    return renter_id

def insert_renters_details(sql_vals):
    # """ insert a new user into the renters_details table """
    sql_query = """INSERT INTO renters_details(renters_id_fkey,renter_email_primary)
             VALUES (%s,%s,False) RETURNING renters_details_id;
             """
    conn = None
    renters_details_id = None
    try:
        # read database configuration
        params = config()
        # connect to the PostgreSQL database
        conn = psycopg2.connect(**params)
        # create a new cursor
        cur = conn.cursor()
        # execute the INSERT statement
        cur.execute(sql_query, sql_vals)
        # get the generated id back
        renters_details_id = cur.fetchone()[0]
        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error) # print exception details
    finally:
        if conn is not None:
            conn.close()
    print('renters_id: ' + str(renter_id))
    return renters_details_id

def insert_renters_premium_log(sql_vals):
    sql_query = """INSERT INTO renters_premium_log(renters_premium_log_timestamp, renters_id_fkey, renters_premium_log_iscancellation)
	VALUES (current_timestamp, %s, %s) RETURNING renters_premium_log_id;
             """
    conn = None
    renters_premium_log_id = None
    try:
        # read database configuration
        params = config()
        # connect to the PostgreSQL database
        conn = psycopg2.connect(**params)
        # create a new cursor
        cur = conn.cursor()
        # execute the INSERT statement
        cur.execute(sql_query, sql_vals)
        # get the generated id back
        renters_premium_log_id = cur.fetchone()[0]
        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error) # print exception details
    finally:
        if conn is not None:
            conn.close()
    print('renters_premium_log_id: ' + str(renters_premium_log_id))
    return renters_premium_log_id

def insert_store(sql_vals):

    

    # """ insert a new user into the users table """
    sql_query = """INSERT INTO stores(renters_id_fkey, locations_cities_id_fkey,stores_geography_coordinates)
             VALUES (%s,%s,ST_GeomFromText(%s)) RETURNING stores_id;
             """
    conn = None
    store_id = None
    try:
        # read database configuration
        params = config()
        # connect to the PostgreSQL database
        conn = psycopg2.connect(**params)
        # create a new cursor
        cur = conn.cursor()
        # execute the INSERT statement
        cur.execute(sql_query, sql_vals)
        # get the generated id back
        store_id = cur.fetchone()[0]
        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error) # print exception details
    finally:
        if conn is not None:
            conn.close()
    print('stores_id: ' + str(store_id))
    return store_id

def insert_store_details(sql_vals):
    # """ insert a new user into the users table """
    sql_query = """INSERT INTO stores_details(stores_id_fkey, store_name, locations_countries_id_fkey,locations_cities_id_fkey, stores_details_email, store_address, store_phone)
             VALUES (%s,%s, %s, %s, %s, %s, %s) RETURNING stores_details_id;
             """
    conn = None
    stores_details_id = None
    try:
        # read database configuration
        params = config()
        # connect to the PostgreSQL database
        conn = psycopg2.connect(**params)
        # create a new cursor
        cur = conn.cursor()
        # execute the INSERT statement
        cur.execute(sql_query, sql_vals)
        # get the generated id back
        stores_details_id = cur.fetchone()[0]
        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error) # print exception details
    finally:
        if conn is not None:
            conn.close()
    print('stores_details_id: ' + str(stores_details_id))
    return stores_details_id

def insert_rental_bike(sql_vals):
    # """ insert a new user into the users table """
    # print(sql_vals)
    sql_query = """INSERT INTO bikes_rentals(bikes_id_fkey, bikes_r_isavailable, renters_id_fkey, stores_id_fkey, bikes_r_priceperday, bikes_r_priceperweek, bikes_r_pricepermonth, locations_countries_id_fkey, locations_cities_id_fkey, bikes_r_depositamount)
             VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, 0) RETURNING bikes_rentals_id;
             """
    conn = None
    rental_bike_id = None
    try:
        # read database configuration
        params = config()
        # connect to the PostgreSQL database
        conn = psycopg2.connect(**params)
        # create a new cursor
        cur = conn.cursor()
        # execute the INSERT statement
        cur.execute(sql_query, sql_vals)
        # get the generated id back
        rental_bike_id = cur.fetchone()[0]
        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error) # print exception details
    finally:
        if conn is not None:
            conn.close()
    print('rental_bike_id: ' + str(rental_bike_id))
    return rental_bike_id

def select_random_user(sql_vals):
    # """ insert a new user into the users table """
    sql_query = """SELECT users_id
             FROM users
             WHERE users_id <> %s
             """
    conn = None
    random_user = None
    try:
        # read database configuration
        params = config()
        # connect to the PostgreSQL database
        conn = psycopg2.connect(**params)
        # create a new cursor
        cur = conn.cursor()
        # execute the SELECT statement
        cur.execute(sql_query, sql_vals)
        
        # get the rows back
        rows = cur.fetchall()
        randomIndex = random.randint(1,(len(rows)-1))
        random_user = rows[randomIndex][0]
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error) # print exception details
    finally:
        if conn is not None:
            conn.close()
    print('random users_id for rentee: ' + str(random_user))
    return random_user

def insert_rental_contract(sql_vals):
    # print(sql_vals)
    sql_query = """INSERT INTO rental_contracts(renters_id_fkey, users_id_fkey, stores_id_fkey, bikes_rentals_id_fkey, r_contracts_userHasBike)
             VALUES (%s, %s, %s, %s, %s) RETURNING rental_contracts_id;
             """
    conn = None
    rental_contracts_id = None
    try:
        # read database configuration
        params = config()
        # connect to the PostgreSQL database
        conn = psycopg2.connect(**params)
        # create a new cursor
        cur = conn.cursor()
        # execute the INSERT statement
        cur.execute(sql_query, sql_vals)
        cur.execute(sql_query, sql_vals)
        # get the generated id back
        rental_contracts_id = cur.fetchone()[0]
        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error) # print exception details
    finally:
        if conn is not None:
            conn.close()
    print('rental_contracts_id: ' + str(rental_contracts_id))
    return rental_contracts_id

def insert_rental_contracts_dates(sql_vals):
    # print(sql_vals)
    sql_query = """INSERT INTO rental_contracts_dates(r_contracts_id_fkey, r_contracts_dates_timestamp, r_contracts_dates_startdate, r_contracts_dates_enddate, r_contracts_dates_price_per_day, r_contracts_dates_total_price_of_dates, locations_countries_id_fkey, r_contracts_dates_num_of_days, r_contracts_payments_status_id_fkey, r_contracts_dates_isUserApproved,r_contracts_dates_isOwnerApproved, r_contracts_dates_isPaidFinalCheck)
             VALUES (%s, current_timestamp, %s, %s, %s, %s, %s, %s, %s, True, %s, False) RETURNING rental_contracts_dates_id;
             """
    conn = None
    rental_contracts_dates_id = None
    try:
        # read database configuration
        params = config()
        # connect to the PostgreSQL database
        conn = psycopg2.connect(**params)
        # create a new cursor
        cur = conn.cursor()
        # execute the INSERT statement
        cur.execute(sql_query, sql_vals)
        # get the generated id back
        rental_contracts_dates_id = cur.fetchone()[0]
        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error) # print exception details
    finally:
        if conn is not None:
            conn.close()
    print('rental_contracts_dates_id: ' + str(rental_contracts_dates_id))
    return rental_contracts_dates_id

def insert_rental_contracts_dates_log(sql_vals):
    sql_query = """INSERT INTO rental_contracts_dates_log(r_contracts_id_fkey, r_contracts_dates_id_fkey, r_contracts_dates_log_timestamp, r_contracts_pay_status_id_fkey_original, r_contracts_pay_status_id_fkey_changedto, r_contracts_d_log_updatequery)
	VALUES (%s, %s, current_timestamp, %s, %s, 'put text describing what changes are happening to the contract on the update query, or simply pass the update query as a string and store it here.') RETURNING rental_contracts_dates_log_id;
             """
    conn = None
    rental_contracts_dates_log_id = None
    try:
        # read database configuration
        params = config()
        # connect to the PostgreSQL database
        conn = psycopg2.connect(**params)
        # create a new cursor
        cur = conn.cursor()
        # execute the INSERT statement
        cur.execute(sql_query, sql_vals)
        # get the generated id back
        rental_contracts_dates_log_id = cur.fetchone()[0]
        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error) # print exception details
    finally:
        if conn is not None:
            conn.close()
    print('rental_contracts_dates_log_id: ' + str(rental_contracts_dates_log_id))
    return rental_contracts_dates_log_id

def createNewUsers(howMany):
    print('creating ' + str(howMany) + ' users...')
    for i in range(1,howMany+1):
        rand_username = generateRandomUsername()
        rand_email = rand_username + '@test.com'
        rand_password = 'kembo123!'
        rand_maker_fkey = generateRandomBikeManufacturerFKey()
        rand_model_fkey = generateRandomBikeModelFKey(rand_maker_fkey)
        rand_year = random.randint(1960, 2019)
        rand_trans = random.randint(1,3)
        rand_bikes_conditions_fkey = random.randint(1,7)

        new_user_id = insert_user([rand_username, rand_password, rand_email])
        new_user_details_id = insert_user_details([new_user_id])
        new_bike_id = insert_bike([new_user_id,rand_maker_fkey, rand_model_fkey, rand_year, rand_trans, rand_bikes_conditions_fkey])
    print('finished creating ' + str(howMany) + ' users')

def createNewRenters(howMany):
    print('creating ' + str(howMany) + ' renters...')
    for i in range(0,howMany):
        # **********************
        # Generate random info
        rand_username = generateRandomUsername()
        rand_email = rand_username + '@test.com'
        rand_password = 'kembo123!'
        rand_maker_fkey1 = generateRandomBikeManufacturerFKey()
        rand_maker_fkey2 = generateRandomBikeManufacturerFKey()
        rand_maker_fkey3 = generateRandomBikeManufacturerFKey()
        rand_maker_fkey4 = generateRandomBikeManufacturerFKey()
        rand_maker_fkey5 = generateRandomBikeManufacturerFKey()
        rand_model_fkey1 = generateRandomBikeModelFKey(rand_maker_fkey1)
        rand_model_fkey2 = generateRandomBikeModelFKey(rand_maker_fkey2)
        rand_model_fkey3 = generateRandomBikeModelFKey(rand_maker_fkey3)
        rand_model_fkey4 = generateRandomBikeModelFKey(rand_maker_fkey4)
        rand_model_fkey5 = generateRandomBikeModelFKey(rand_maker_fkey5)
        rand_year1 = random.randint(1960, 2019)
        rand_year2 = random.randint(1960, 2019)
        rand_year3 = random.randint(1960, 2019)
        rand_year4 = random.randint(1960, 2019)
        rand_year5 = random.randint(1960, 2019)
        rand_trans1 = random.randint(1,3)
        rand_trans2 = random.randint(1,3)
        rand_trans3 = random.randint(1,3)
        rand_trans4 = random.randint(1,3)
        rand_trans5 = random.randint(1,3)
        rand_bikes_conditions_fkey1 = random.randint(1,7)
        rand_bikes_conditions_fkey2 = random.randint(1,7)
        rand_bikes_conditions_fkey3 = random.randint(1,7)
        rand_bikes_conditions_fkey4 = random.randint(1,7)
        rand_bikes_conditions_fkey5 = random.randint(1,7)

        rand_country_id = random.randint(1,2) # 1=vn, 2=th
        rand_city_id = 3 if rand_country_id==2 else random.randint(1,2) # 1=DAD, 2=SGN, 3=BKK
        rand_coordinates_inVnTh = getRandomCoordinatesInVnOrThai(rand_city_id)

        # ***************
        # Begin INSERTing random info for users and bikes
        # ***************
        new_user_id = insert_user([rand_username, rand_password, rand_email])
        new_user_details_id = insert_user_details([new_user_id])
        new_bike1_id = insert_bike([new_user_id,rand_maker_fkey1, rand_model_fkey1, rand_year1, rand_trans1, rand_bikes_conditions_fkey1])
        new_bike2_id = insert_bike([new_user_id,rand_maker_fkey2, rand_model_fkey2, rand_year2, rand_trans2, rand_bikes_conditions_fkey2])
        new_bike3_id = insert_bike([new_user_id,rand_maker_fkey3, rand_model_fkey3, rand_year3, rand_trans3, rand_bikes_conditions_fkey3])
        new_bike4_id = insert_bike([new_user_id,rand_maker_fkey4, rand_model_fkey4, rand_year4, rand_trans4, rand_bikes_conditions_fkey4])
        new_bike5_id = insert_bike([new_user_id,rand_maker_fkey5, rand_model_fkey5, rand_year5, rand_trans5, rand_bikes_conditions_fkey5])
        # create a renter 
        new_renter_id = insert_renter([new_user_id, rand_city_id])
        # new_renters_details_id = insert_renters_details([]) can finish this later, not hugely important to current dev
        
        # create new store
        new_store_id = insert_store([new_renter_id, rand_city_id, rand_coordinates_inVnTh])
        rando_store_name = getRandoStoreName()
        new_store_details_id = insert_store_details([new_store_id, rando_store_name, rand_country_id, rand_city_id, getRandoStoreEmail(rando_store_name), getRandoStoreAddress(), getStorePhoneString()])
        new_renters_premium_log_id = insert_renters_premium_log([new_renter_id, random.choice([True, False])])
        
        # create rental bikes from the first 4 of 5 bikes related to this user-renter
        rBikePriceD, rBikePriceW, rBikePriceM = getRandoRentBikePrice()
        new_rental_bike1_id = insert_rental_bike([new_bike1_id, True, new_renter_id, new_store_id, rBikePriceD, rBikePriceW, rBikePriceM, rand_country_id, rand_city_id ])
        rBikePriceD, rBikePriceW, rBikePriceM = getRandoRentBikePrice()        
        new_rental_bike2_id = insert_rental_bike([new_bike2_id, True, new_renter_id, new_store_id, rBikePriceD, rBikePriceW, rBikePriceM, rand_country_id, rand_city_id ])
        rBikePriceD3, rBikePriceW3, rBikePriceM3 = getRandoRentBikePrice()        
        new_rental_bike3_id = insert_rental_bike([new_bike3_id, True, new_renter_id, new_store_id, rBikePriceD3, rBikePriceW3, rBikePriceM3, rand_country_id, rand_city_id ])
        rBikePriceD, rBikePriceW, rBikePriceM = getRandoRentBikePrice()        
        new_rental_bike4_id = insert_rental_bike([new_bike4_id, True, new_renter_id, new_store_id, rBikePriceD, rBikePriceW, rBikePriceM, rand_country_id, rand_city_id ])
        
        # create a rental contract
        rando_rentee = select_random_user([new_user_id]) # anyone except this renter-user
        isOwnerApproved = random.choice([True, False])
        payments_status_id_fkey = random.choice([1,2,5,12]) if isOwnerApproved else random.choice([3,5,6,7,8,10,12])
        userHasBikeBool = True if payments_status_id_fkey == 2 or payments_status_id_fkey == 9 else False
        new_rental_contract_id = insert_rental_contract([new_renter_id, rando_rentee, new_store_id, new_rental_bike3_id, userHasBikeBool])
        # create a row in rental_contracts_dates
        rand_daysOfContract = random.randint(10,30)
        enddate = '01-' + str(1+rand_daysOfContract) + '-2019'
        
        
        
        new_rental_contract_dates_id = insert_rental_contracts_dates([new_rental_contract_id, '01-09-2019', enddate, rBikePriceD3, (rBikePriceD3 * rand_daysOfContract), rand_country_id, rand_daysOfContract, payments_status_id_fkey,isOwnerApproved])
        new_rental_contracts_dates_log_id = insert_rental_contracts_dates_log([new_rental_contract_id, new_rental_contract_dates_id, payments_status_id_fkey, payments_status_id_fkey])

    print('finished creating ' + str(howMany) + ' renters')

createNewUsers(3)
createNewRenters(100)