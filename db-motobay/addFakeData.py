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
    makers_id = [1,2,4,5,6,7,8,9]
    return makers_id[random.randint(1,len(makers_id)-1)]

def insert_user(sql_vals):
    # """ insert a new user into the users table """
    sql_query = """INSERT INTO users(username,password,email)
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
    sql_query = """INSERT INTO users_details(users_id_fkey)
             VALUES (%s) RETURNING users_details_id;
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
    sql_query = """INSERT INTO bikes(users_id_fkey)
             VALUES (%s) RETURNING bikes_id;
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
    sql_query = """INSERT INTO bikes_details(bikes_id_fkey, bikes_makers_id_fkey)
             VALUES (%s,%s) RETURNING bikes_details_id;
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
    sql_query = """INSERT INTO renters(users_id_fkey)
             VALUES (%s) RETURNING renters_id;
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
    sql_query = """INSERT INTO stores(renters_id_fkey)
             VALUES (%s) RETURNING stores_id;
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
    for i in range(1,howMany):
        new_username = generateRandomUsername()
        new_email = new_username + '@test.com'
        new_password = 'kembo123!'
        new_maker = generateRandomBikeManufacturerFKey()

        new_user_id = insert_user([new_username, new_password, new_email])
        new_user_details_id = insert_user_details([new_user_id])
        new_bike_id = insert_bike([new_user_id])
        new_bike_details_id = insert_bike_details([new_bike_id, new_maker])
    print('finished creating ' + str(howMany) + ' users')

def createNewRenters(howMany):
    print('creating ' + str(howMany) + ' users...')
    for i in range(0,howMany):
        new_username = generateRandomUsername()
        new_email = new_username + '@test.com'
        new_password = 'kembo123!'
        new_maker = generateRandomBikeManufacturerFKey()

        new_user_id = insert_user([new_username, new_password, new_email])
        new_user_details_id = insert_user_details([new_user_id])
        new_bike1_id = insert_bike([new_user_id])
        new_bike2_id = insert_bike([new_user_id])
        new_bike3_id = insert_bike([new_user_id])
        new_bike4_id = insert_bike([new_user_id])
        new_bike5_id = insert_bike([new_user_id])
        new_bike1_details_id = insert_bike_details([new_bike1_id, new_maker])
        new_bike2_details_id = insert_bike_details([new_bike2_id, new_maker])
        new_bike3_details_id = insert_bike_details([new_bike3_id, new_maker])
        new_bike4_details_id = insert_bike_details([new_bike4_id, new_maker])
        new_bike5_details_id = insert_bike_details([new_bike5_id, new_maker])
        
        new_renter_id = insert_renter([new_user_id])
        new_store_id = insert_store([new_renter_id])
        new_rental_bike1_id = insert_rental_bike([new_bike1_id, new_renter_id])
        new_rental_bike2_id = insert_rental_bike([new_bike2_id, new_renter_id])
        new_rental_bike3_id = insert_rental_bike([new_bike3_id, new_renter_id])
        new_rental_bike4_id = insert_rental_bike([new_bike4_id, new_renter_id])
        new_rental_bike5_id = insert_rental_bike([new_bike5_id, new_renter_id])
        new_bikes_rentals1_location = insert_bikes_rentals_location([new_rental_bike1_id,new_store_id])
        new_bikes_rentals2_location = insert_bikes_rentals_location([new_rental_bike2_id,new_store_id])
        new_bikes_rentals3_location = insert_bikes_rentals_location([new_rental_bike3_id,new_store_id])
        new_bikes_rentals4_location = insert_bikes_rentals_location([new_rental_bike4_id,new_store_id])
        new_bikes_rentals5_location = insert_bikes_rentals_location([new_rental_bike5_id,new_store_id])
        rando_rentee = select_random_user([new_user_id]) # anyone except this renter
        new_rental_contract = insert_rental_contract([new_renter_id, rando_rentee, new_store_id, new_rental_bike3_id])
    print('finished creating ' + str(howMany) + ' renters')

# createNewUsers(15)
createNewRenters(300)