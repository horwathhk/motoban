import psycopg2
from config import config
import random


def getDateForExtension(oldEndDate, numDaysExt=1):
    oldEndDate = str(oldEndDate)
    lenOfStr = len(oldEndDate)
    dayNum = int(oldEndDate[-2:])
    dayMonth = int(oldEndDate[5:7])
    dayExt = numDaysExt + dayNum
    if (dayExt>31):
        dayMonth = str((dayMonth + 1))
        dayExt = str(dayExt - 31)
        if(dayExt<10):
            dayExt = '0' + dayExt
    newDate = str(oldEndDate[:5]) + '0' + str(dayMonth) + '-' + str(dayExt)
    print('new date: ' + newDate)
    return newDate

def select_random_r_contract_PaidAndDone():
    # """ insert a new user into the users table """
    sql_query = """WITH random_rc AS (SELECT * FROM rental_contracts ORDER BY RANDOM() 
				  ),
        rc_dates AS (SELECT * FROM rental_contracts_dates 
			 INNER JOIN random_rc ON random_rc.rental_contracts_id = r_contracts_id_fkey
			 INNER JOIN rental_contracts_payments_status ON rental_contracts_payments_status.rental_contracts_payments_status_id = rental_contracts_dates.r_contracts_payments_status_id_fkey
			 WHERE rental_contracts_dates.r_contracts_payments_status_id_fkey = 2
			 AND  random_rc.r_contracts_userhasbike = True
			)
        SELECT * FROM rc_dates ORDER BY RANDOM() LIMIT 1
             """
    conn = None
    random_contracts_paid = None
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
        
        random_contracts_paid = [dict((cur.description[i][0], value) \
               for i, value in enumerate(row)) for row in cur.fetchall()]
        print(random_contracts_paid)
        # random_contracts_paid = cur.fetchone()
        # print(random_contract)

        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error) # print exception details
    finally:
        if conn is not None:
            conn.close()
        lenOfQueryResults = len(random_contracts_paid)
    print('number of contracts returned: ' + str(lenOfQueryResults))
    return random_contracts_paid

def insert_rental_contracts_dates_extension(sql_vals):
    # print(sql_vals)
    sql_query = """INSERT INTO rental_contracts_dates(r_contracts_id_fkey, r_contracts_dates_timestamp, r_contracts_dates_startdate, r_contracts_dates_enddate, r_contracts_dates_price_per_day, r_contracts_dates_total_price_of_dates, locations_countries_id_fkey, r_contracts_dates_num_of_days, r_contracts_payments_status_id_fkey, r_contracts_dates_isUserApproved, r_contracts_dates_isOwnerApproved, r_contracts_dates_isextension, r_contracts_dates_isPaidFinalCheck)
             VALUES (%s, current_timestamp, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING rental_contracts_dates_id;
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
        # r = [dict((cur.description[i][0], value) \
        #        for i, value in enumerate(row)) for row in cur.fetchall()]
        
        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error) # print exception details
    finally:
        if conn is not None:
            conn.close()
    print('rental_contracts_dates_id with extension: ' + str(rental_contracts_dates_id))
    return rental_contracts_dates_id

def createNewExtenstions(howMany):
    print('creating ' + str(howMany) + ' transactions...')
    for i in range(0,howMany):
        # **********************
        # Generate random info
        rando_r_contract_paid = select_random_r_contract_PaidAndDone()
        # returns an array with these values:
            # rc_d_id, rc_id_fkey, rc_d_timestamp, 
            # rc_d_startd, rc_d_endd, rc_d_dreceived, 
            # rc_ppd, rc_tpod, country_id, 
            # rc_numDays,rc_pay_status_id_fkey, rc_d_isextension, 
            # rc_d_isOwnerAppr, rc_d_isUserAppr, r_contracts_dates_isPaidFinalCheck,
            # rc_id, br_id_fkey, users_id_fkey, r_id_fkey, 
            # s_id_fkey, rc_userHasBike, rc_pay_status_id, 
            # rc_pay_status_isPaid, rc_pay_status_descript
        rc_id = rando_r_contract_paid[0]['rental_contracts_id']
        # print(rando_r_contract_paid)
        extStartDate = getDateForExtension(rando_r_contract_paid[0]['r_contracts_dates_startdate'], 1)
        numDaysToExtend = random.randint(1,15)
        extEndDate = getDateForExtension(rando_r_contract_paid[0]['r_contracts_dates_startdate'], numDaysToExtend)
        isOwnerApproved = random.choice([False, False, False, False, True])
        payment_status_fkey = random.choice([3,10])
        r_contracts_dates_log_id = insert_rental_contracts_dates_extension([
            rc_id, 
            extStartDate, 
            extEndDate, 
            rando_r_contract_paid[0]['r_contracts_dates_price_per_day'],
            (rando_r_contract_paid[0]['r_contracts_dates_price_per_day'] * numDaysToExtend),
            rando_r_contract_paid[0]['locations_countries_id_fkey'],
            numDaysToExtend,
            payment_status_fkey,
            True,
            isOwnerApproved,
            True,
            random.choice([True,True,False]) if isOwnerApproved and payment_status_fkey == 3 else False
            ])

createNewExtenstions(10)