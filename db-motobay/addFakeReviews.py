import psycopg2
from config import config
import random
import datetime
from random import randrange


def generateRandomReviewStars():
    numberOfStars=random.randint(1,6)
    print('stars: ' + str(numberOfStars))
    return numberOfStars;  

def generateRandomReviewTitle():
    reviewTitlesList = [
        'Awesome Experience',
        'We had the time of our lives',
        'Fantastic service',
        'Delivered right to our hotel!',
        'Pretty good experience',
        'Generally okay, but could have been better',
        'Meh, was okay I guess',
        'Bike never showed up',
        'Bike shop doesnt exist',
        'Nightmare'
    ]

    reviewTitle = reviewTitlesList[random.randint(1,len(reviewTitlesList)-1)]
    print('review ' + reviewTitle )
    return reviewTitle

def generateRandomReviewBody():
        reviewBodiesList = [
        'My husband and I had a great time, we honestly couldnt ask for anything more. Absolutely would rent from them again.',
        'Incredible. Bike was at the hotel right when I arrived, giving us a whole day to explore',
        'Bike was in great condition! We got a flat but they sent a mechanic right away!',
        'Bike was a bit rougher than we expected but generally it was a positive experience',
        'We had some difficulty with the bike at first, but thing went smoothly after the first day',
        'Cant recommend. Service was bad and the bike only had one wheel!',
        'Not the best experience, would recommend other shops on here first'
        ]
        reviewBody = reviewBodiesList[random.randint(1,len(reviewBodiesList)-1)]
        print('reviewbody: ' + reviewBody)
        return reviewBody

def generateRandomDateAndTime(howMany):
    # generate random number scaled to number of seconds in a day
    # (24*60*60) = 86,400

    rtime = int(random.random()*86400)
    hours   = int(rtime/3600)
    minutes = int((rtime - hours*3600)/60)
    seconds = rtime - hours*3600 - minutes*60
    
    rday = random.randint(1,30)
    rmonth = random.randint(1,12)
    ryear = random.randint(2000,2018)

    for i in range(1,howMany+1):
        time_stamp_date = '%02d/%02d/%02d ' % (rday, rmonth, ryear)
        time_stamp_time = '%02d:%02d:%02d' % (hours, minutes, seconds)
        time_stamp = time_stamp_date + time_stamp_time
        print(time_stamp)    
        return time_stamp

def selectRandomContract_UnreviewedBike():
    # """ insert a new user into the users table """
    sql_query = """WITH random_rcs AS 
                (SELECT * FROM rental_contracts 
                ORDER BY RANDOM() 
                ),
                rc_bikes AS (
                    SELECT * FROM bikes_rentals 
                    INNER JOIN random_rcs ON random_rcs.bikes_rentals_id_fkey = bikes_rentals.bikes_rentals_id
                    LEFT JOIN bikes_rentals_stars ON bikes_rentals_stars.bikes_rentals_id_fkey = bikes_rentals.bikes_rentals_id
                    LEFT JOIN bikes_rentals_reviews ON bikes_rentals_reviews.bikes_rentals_stars_id_fkey = bikes_rentals_stars.bikes_rentals_stars_id
                    WHERE bikes_rentals_reviews.bikes_rentals_reviews_id IS NULL 
                )

                SELECT * FROM rc_bikes ORDER BY RANDOM() LIMIT 1
             """
    conn = None
    random_contracts_bikeUnreviewed = None
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
        
        random_contracts_bikeUnreviewed = [dict((cur.description[i][0], value) \
               for i, value in enumerate(row)) for row in cur.fetchall()]
        print(random_contracts_bikeUnreviewed)
        # random_contracts_paid = cur.fetchone()
        # print(random_contract)

        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error) # print exception details
    finally:
        if conn is not None:
            conn.close()
    return random_contracts_bikeUnreviewed[0]

def insert_stores_reviews(sql_vals):
    # print(sql_vals)
    sql_query = """INSERT INTO stores_reviews(stores_reviews_title, stores_reviews_body, stores_id_fkey, bikes_rentals_id_fkey)
             VALUES (%s,%s, %s, %s) RETURNING stores_reviews_id;
             """
    conn = None
    stores_reviews_id = None
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
        print(error)  # print exception details
    finally:
        if conn is not None:
            conn.close()
    print('stores_reviews_id: ' + str(stores_reviews_id))
    return stores_reviews_id

def insert_stores_stars(sql_vals):
    # print(sql_vals)
    sql_query = """INSERT INTO stores_stars(bikes_rentals_id_fkey, stores_id_fkey, bikes_rentals_stars)
             VALUES (%s,%s, %s) RETURNING stores_stars_id;
             """
    conn = None
    stores_stars_id = None
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
        stores_stars_id = cur.fetchone()[0]
        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)  # print exception details
    finally:
        if conn is not None:
            conn.close()
    print('	stores_stars_id: ' + str(	stores_stars_id))
    return stores_stars_id

def insert_bikes_rentals_reviews(sql_vals):
    # print(sql_vals)
    sql_query = """INSERT INTO bikes_rentals_reviews(r_contracts_reviews_title, r_contracts_reviews_body,  r_contracts_id_fkey, bikes_rentals_stars_id_fkey, bikes_rentals_reviews_timestamp)
             VALUES (%s,%s, %s, %s, current_timestamp) RETURNING bikes_rentals_reviews_id;
             """
    conn = None
    rental_reviews_id = None
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
        rental_reviews_id = cur.fetchone()[0]
        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)  # print exception details
    finally:
        if conn is not None:
            conn.close()
    print('rental_reviews_id: ' + str(rental_reviews_id))
    return rental_reviews_id

def insert_bikes_rentals_stars(sql_vals):
    # print(sql_vals)
    sql_query = """INSERT INTO bikes_rentals_stars(r_contracts_id_fkey, bikes_rentals_id_fkey, bikes_rentals_stars)
             VALUES (%s,%s,%s) RETURNING bikes_rentals_stars_id;
             """
    conn = None
    rentals_reviews_stars_id = None
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
        rentals_reviews_stars_id = cur.fetchone()[0]
        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)  # print exception details
    finally:
        if conn is not None:
            conn.close()
    print('	stores_stars_id: ' + str(rentals_reviews_stars_id))
    return rentals_reviews_stars_id

def createNewStoreReview(howMany):
    print('creating ' + str(howMany) + ' store reviews...')
    for i in range(0, howMany):
        randomID = random.randint(0, 200)
        print(randomID)
        reviewTitle = generateRandomReviewTitle()
        reviewBody = generateRandomReviewBody()
        store_id_fkey = random.randint(0, 100)
        bikes_rentals_id_fkey = select_random_bikes_rentals([randomID])
        bikes_rentals_stars = generateRandomReviewStars()
        new_stores_review_id = insert_stores_reviews(
            [reviewTitle, reviewBody, store_id_fkey, bikes_rentals_id_fkey])

        new_stores_stars_id = insert_stores_stars(
            [bikes_rentals_id_fkey, store_id_fkey, bikes_rentals_stars])

        print("stores review id: " + str(new_stores_review_id))
        print("stores stars id: " + str(new_stores_stars_id))

def createNewBikeReview(howMany):
    print('creating ' + str(howMany) + ' bike reviews...')
    for i in range(0, howMany):
        rc_json = selectRandomContract_UnreviewedBike()

        r_contracts_reviews_title = generateRandomReviewTitle()
        r_contracts_reviews_body = generateRandomReviewBody()
        r_contracts_id_fkey = rc_json['rental_contracts_id']
        bikes_rentals_id_fkey = rc_json['bikes_rentals_id']
        bikes_rentals_stars = generateRandomReviewStars()
        
        new_bikes_rentals_reviews_stars_id = insert_bikes_rentals_stars(
            [r_contracts_id_fkey, bikes_rentals_id_fkey, bikes_rentals_stars])

        new_bikes_rentals_reviews_id = insert_bikes_rentals_reviews(
            [r_contracts_reviews_title,  r_contracts_reviews_body, r_contracts_id_fkey, new_bikes_rentals_reviews_stars_id ])

        
        print("new_bikes_rentals_reviews_id " + str(new_bikes_rentals_reviews_id))
        print(" new_bikes_rentals_stars_id " +
              str(new_bikes_rentals_reviews_stars_id))






# createNewStoreReview(1)
createNewBikeReview(1)
