import psycopg2
from config import config
import random
import time


def select_random_r_contract_UnPaidOnHold(sql_vals):
    # """ insert a new user into the users table """
    sql_query = """WITH random_rc AS (SELECT * FROM rental_contracts ORDER BY RANDOM() 
                ),
                rc_dates AS (SELECT * FROM rental_contracts_dates 
                    INNER JOIN random_rc ON random_rc.rental_contracts_id = r_contracts_id_fkey
                    INNER JOIN rental_contracts_payments_status ON rental_contracts_payments_status.rental_contracts_payments_status_id = rental_contracts_dates.r_contracts_payments_status_id_fkey
                    WHERE rental_contracts_dates.r_contracts_payments_status_id_fkey = %s
                    AND  random_rc.r_contracts_userhasbike = False
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
        cur.execute(sql_query, sql_vals)
        
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

def update_r_contracts_dates_with_PaidNotVer(sql_vals):
    # print(sql_vals)

    sql_query = """UPDATE rental_contracts_dates SET r_contracts_payments_status_id_fkey = %s 
                    WHERE r_contracts_id_fkey = %s;
                INSERT INTO rental_contracts_dates_log(r_contracts_id_fkey, r_contracts_dates_id_fkey, r_contracts_dates_log_timestamp, r_contracts_pay_status_id_fkey_original, r_contracts_pay_status_id_fkey_changedto, r_contracts_d_log_updatequery)
	            VALUES (%s, %s, current_timestamp, %s, %s, %s)
                RETURNING rental_contracts_dates_log_id;
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
    print('rental_contracts_dates_log_id with update of rc: ' + str(rental_contracts_dates_log_id))
    return rental_contracts_dates_log_id

def update_r_contracts_dates_with_PaymVer(sql_vals):
    # print(sql_vals)

    sql_query = """UPDATE rental_contracts_dates SET r_contracts_payments_status_id_fkey = %s 
                    WHERE r_contracts_id_fkey = %s;
                INSERT INTO rental_contracts_dates_log(r_contracts_id_fkey, r_contracts_dates_id_fkey, r_contracts_dates_log_timestamp, r_contracts_pay_status_id_fkey_original, r_contracts_pay_status_id_fkey_changedto, r_contracts_d_log_updatequery)
	            VALUES (%s, %s, current_timestamp, %s, %s, %s)
                RETURNING rental_contracts_dates_log_id;
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
    print('rental_contracts_dates_log_id with update of rc: ' + str(rental_contracts_dates_log_id))
    return rental_contracts_dates_log_id

def update_r_contracts_dates_with_OwnerAppr(sql_vals):
    # print(sql_vals)

    sql_query = """UPDATE rental_contracts_dates SET r_contracts_dates_isOwnerApproved = %s 
                    WHERE r_contracts_id_fkey = %s;
                INSERT INTO rental_contracts_dates_log(r_contracts_id_fkey, r_contracts_dates_id_fkey, r_contracts_dates_log_timestamp, r_contracts_pay_status_id_fkey_original, r_contracts_pay_status_id_fkey_changedto, r_contracts_d_log_updatequery)
	            VALUES (%s, %s, current_timestamp, %s, %s, %s)
                RETURNING rental_contracts_dates_log_id;
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
    print('rental_contracts_dates_log_id with update of rc: ' + str(rental_contracts_dates_log_id))
    return rental_contracts_dates_log_id

def update_r_contracts_dates_with_UserGetsBike(sql_vals):
    # print(sql_vals)

    sql_query = """UPDATE rental_contracts SET r_contracts_userHasBike = %s 
                    WHERE rental_contracts_id = %s;
                INSERT INTO rental_contracts_dates_log(r_contracts_id_fkey, r_contracts_dates_id_fkey, r_contracts_dates_log_timestamp, r_contracts_pay_status_id_fkey_original, r_contracts_pay_status_id_fkey_changedto, r_contracts_d_log_updatequery)
	            VALUES (%s, %s, current_timestamp, %s, %s, %s)
                RETURNING rental_contracts_dates_log_id;
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
    print('rental_contracts_dates_log_id with update of rc: ' + str(rental_contracts_dates_log_id))
    return rental_contracts_dates_log_id

def createNewResUserGetsBikeAndReturnsBike(howMany):
    print('creating ' + str(howMany) + ' reservations...')
    # Scenario: user updates an unpaid-hold to a paid-hold, 
    PAYMENT_STATUS_CREATE = 8 # not paid, on hold
    # then
    PAYMENT_STATUS_UPDATE = 1 # paid but not verified
    TimeOn = False
    for i in range(0,howMany):
        # **********************
        # Generate random info
        rando_r_contract_paid = select_random_r_contract_UnPaidOnHold([PAYMENT_STATUS_CREATE])
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
        rcd_id = rando_r_contract_paid[0]['rental_contracts_dates_id']
        # now update the rc_dates row and insert on dates_log

        # user makes payment
        r_contracts_dates_log_id1 = update_r_contracts_dates_with_PaidNotVer([PAYMENT_STATUS_UPDATE, rc_id, rc_id, rcd_id, PAYMENT_STATUS_CREATE, PAYMENT_STATUS_UPDATE, 'user initiated a payment'])
        [time.sleep(1) if TimeOn else False]
        print('payment verifying...')
        [time.sleep(2) if TimeOn else False]
        # payment verifies
        PAYMENT_STATUS_CREATE = PAYMENT_STATUS_UPDATE
        PAYMENT_STATUS_UPDATE = 2
        r_contracts_dates_log_id2 = update_r_contracts_dates_with_PaymVer([PAYMENT_STATUS_UPDATE, rc_id, rc_id, rcd_id, PAYMENT_STATUS_CREATE, PAYMENT_STATUS_UPDATE, 'user payment was verified'])
        print('payment verified.')
        [time.sleep(3) if TimeOn else False]
        # owner approves
        r_contracts_dates_log_id3 = update_r_contracts_dates_with_OwnerAppr([True, rc_id, rc_id, rcd_id, PAYMENT_STATUS_CREATE, PAYMENT_STATUS_UPDATE, 'owner approved of rental contract'])
        print('owner approves.')
        [time.sleep(2) if TimeOn else False]
        # user gets bike
        r_contracts_dates_log_id4 = update_r_contracts_dates_with_UserGetsBike([True, rc_id, rc_id, rcd_id, PAYMENT_STATUS_CREATE, PAYMENT_STATUS_UPDATE, 'owner approved of rental contract'])
        print('user got the bike.')

createNewResUserGetsBikeAndReturnsBike(1)