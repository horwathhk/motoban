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
    return random.randint(11,12)

def getRandomCoordinatesInVnOrThai(city_fkey):
    if(city_fkey==1):
        # coordinates in danang
        rand_variance_lat = random.randint(6033,7476)
        rand_variance_long = random.randint(1001,2428)
        return 'SRID=4326;POINT(108.' + str(rand_variance_long) + ' 16.0' + str(rand_variance_lat) + ')'
    if(city_fkey==2):
        # coordinates in saigon
        rand_variance_lat = random.randint(3311,9999)
        rand_variance_long = random.randint(3001,6668)
        return 'SRID=4326;POINT(106.' + str(rand_variance_long) + ' 10.7' + str(rand_variance_lat) + ')'
    if(city_fkey==3):
        # coordinates in bangkok
        rand_variance_lat = random.randint(5955,7563)
        rand_variance_long = random.randint(4555,5100)
        return 'SRID=4326;POINT(100.' + str(rand_variance_long) + ' 13' + str(rand_variance_lat) + ')'

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

def getRandoStoreEmail(storename):
    
    return storename.replace(" ", "") + '@test.com'

def getRandoStoreAddress():
    streetnum = random.randint(13,99999)
    streetname = 'Main Street'
    areacode = random.randint(24777,98999)
    return str(streetnum) + ' ' + streetname + ', ' + str(areacode)

def getRandoCountry():
    # """ insert a new user into the users table """
    sql_query = """SELECT countries_id
             FROM locations_countries 
             WHERE iso = 'VN' OR iso = 'KH' OR iso = 'TH'
             """
    conn = None
    random_country_id = None
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
        random_country_id = rows[randomIndex][0]
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error) # print exception details
    finally:
        if conn is not None:
            conn.close()
    print('random country_id for store: ' + str(random_country_id))
    return random_country_id
    
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
    sql_query = """INSERT INTO renters(users_id_fkey,city_fkey,isPremium)
             VALUES (%s,%s,0) RETURNING renters_id;
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

def insert_store(sql_vals):
    # """ insert a new user into the users table """
    sql_query = """INSERT INTO stores(renters_id_fkey, locations_cities_id_fkey,stores_geography_coordinates geography)
             VALUES (%s,%s,%s) RETURNING stores_id;
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
    sql_query = """INSERT INTO stores_details(stores_id_fkey, store_name, locations_countries_id_fkey, locations_cities_id_fkey, store_email, store_address)
             VALUES (%s,%s, %s, %s, %s, %s) RETURNING stores_details_id;
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
    sql_query = """INSERT INTO bikes_rentals(bikes_id_fkey, "bikes_rentals_isAvailable", renters_id_fkey)
             VALUES (%s, TRUE, %s) RETURNING bikes_rentals_id;
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

def insert_bikes_rentals_location(sql_vals):
    # """ insert a new user into the users table """
    sql_query = """INSERT INTO bikes_rentals_locations(bikes_rentals_id_fkey, stores_id_fkey)
             VALUES (%s, %s) RETURNING bikes_rentals_locations_id;
             """
    conn = None
    bikes_rentals_location_id = None
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
        bikes_rentals_location_id = cur.fetchone()[0]
        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error) # print exception details
    finally:
        if conn is not None:
            conn.close()
    print('bikes_rentals_location_id: ' + str(bikes_rentals_location_id))
    return bikes_rentals_location_id

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
    sql_query = """INSERT INTO rental_contracts(renters_id_fkey, users_id_fkey, stores_id_fkey, bikes_rentals_id_fkey)
             VALUES (%s, %s, %s, %s) RETURNING rental_contract_id;
             """
    conn = None
    rental_contract_id = None
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
        rental_contract_id = cur.fetchone()[0]
        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error) # print exception details
    finally:
        if conn is not None:
            conn.close()
    print('rental_contract_id: ' + str(rental_contract_id))
    return rental_contract_id

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
    print('creating ' + str(howMany) + ' users...')
    for i in range(0,howMany):
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


        rand_city_fkey = random.randint(1,3)
        rand_coordinates_inVnTh = getRandomCoordinatesInVnOrThai(rand_city_fkey)

        new_user_id = insert_user([rand_username, rand_password, rand_email])
        new_user_details_id = insert_user_details([new_user_id])
        new_bike1_id = insert_bike([new_user_id,rand_maker_fkey1, rand_model_fkey1, rand_year1, rand_trans1, rand_bikes_conditions_fkey1])
        new_bike2_id = insert_bike([new_user_id,rand_maker_fkey2, rand_model_fkey2, rand_year2, rand_trans2, rand_bikes_conditions_fkey2])
        new_bike3_id = insert_bike([new_user_id,rand_maker_fkey3, rand_model_fkey3, rand_year3, rand_trans3, rand_bikes_conditions_fkey3])
        new_bike4_id = insert_bike([new_user_id,rand_maker_fkey4, rand_model_fkey4, rand_year4, rand_trans4, rand_bikes_conditions_fkey4])
        new_bike5_id = insert_bike([new_user_id,rand_maker_fkey5, rand_model_fkey5, rand_year5, rand_trans5, rand_bikes_conditions_fkey5])

        new_renter_id = insert_renter([new_user_id, rand_city_fkey])
        new_store_id = insert_store([new_renter_id, rand_city_fkey, rand_coordinates_inVnTh])

        # rando_country = getRandoCountry()
        # rando_store_name = getRandoStoreName()
        # new_store_details_id = insert_store_details([new_store_id, rando_store_name, rando_country, getRandoCity([rando_country]), getRandoStoreEmail(rando_store_name), getRandoStoreAddress()])

        # new_rental_bike1_id = insert_rental_bike([new_bike1_id, new_renter_id])
        # new_rental_bike2_id = insert_rental_bike([new_bike2_id, new_renter_id])
        # new_rental_bike3_id = insert_rental_bike([new_bike3_id, new_renter_id])
        # new_rental_bike4_id = insert_rental_bike([new_bike4_id, new_renter_id])
        # new_rental_bike5_id = insert_rental_bike([new_bike5_id, new_renter_id])
        # new_bikes_rentals1_location = insert_bikes_rentals_location([new_rental_bike1_id,new_store_id])
        # new_bikes_rentals2_location = insert_bikes_rentals_location([new_rental_bike2_id,new_store_id])
        # new_bikes_rentals3_location = insert_bikes_rentals_location([new_rental_bike3_id,new_store_id])
        # new_bikes_rentals4_location = insert_bikes_rentals_location([new_rental_bike4_id,new_store_id])
        # new_bikes_rentals5_location = insert_bikes_rentals_location([new_rental_bike5_id,new_store_id])
        # rando_rentee = select_random_user([new_user_id]) # anyone except this renter
        # new_rental_contract = insert_rental_contract([new_renter_id, rando_rentee, new_store_id, new_rental_bike3_id])
    print('finished creating ' + str(howMany) + ' renters')

# createNewUsers(5)
createNewRenters(20)