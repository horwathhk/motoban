import psycopg2
from config import config
import random


def select_random_r_contract_PaidAndDone():
    # """ insert a new user into the users table """
    sql_query = """WITH random_rc AS 
                        (SELECT * FROM rental_contracts ORDER BY RANDOM() 
                        --LIMIT 1 
                        ),
                    rc_dates AS (SELECT * FROM rental_contracts_dates 
			                        INNER JOIN random_rc 
                                    INNER JOIN rental_contracts_payments_status ON rental_contracts_payments_status.rental_contracts_payments_status_id = rental_contracts_dates.r_contracts_payments_status_id_fkey
                                    ON random_rc.rental_contracts_id = r_contracts_id_fkey
                                    WHERE rental_contracts_dates.r_contracts_payments_status_id_fkey = 2
                    )
                    SELECT * FROM rc_dates 
                    WHERE rc_dates.rental_contracts_dates_id = 
                        (SELECT MAX(rental_contracts_dates_id) FROM rc_dates)
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
        random_contracts_paid = cur.fetchall()
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

def select_random_r_contract():
    # """ insert a new user into the users table """
    sql_query = """WITH random_rc AS 
                        (SELECT * FROM rental_contracts ORDER BY RANDOM() LIMIT 1 ),
                    rc_dates AS (SELECT * FROM rental_contracts_dates 
			                        INNER JOIN random_rc 
                                    INNER JOIN rental_contracts_payments_status ON rental_contracts_payments_status.rental_contracts_payments_status_id = rental_contracts_dates.r_contracts_payments_status_id_fkey
                                    ON random_rc.rental_contracts_id = r_contracts_id_fkey
			        )
                    SELECT * FROM rc_dates 
                    WHERE rc_dates.rental_contracts_dates_id = 
                        (SELECT MAX(rental_contracts_dates_id) FROM rc_dates)
             """
    conn = None
    random_contract = None
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
        random_contract = cur.fetchone()
        # print(random_contract)

        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error) # print exception details
    finally:
        if conn is not None:
            conn.close()
    print('random rc_id for transaction: ' + str(random_contract))
    return random_contract

def createNewExtenstions(howMany):
    print('creating ' + str(howMany) + ' transactions...')
    for i in range(0,howMany):
        # **********************
        # Generate random info
        rando_r_contract = select_random_r_contract()

createNewExtenstions(1)