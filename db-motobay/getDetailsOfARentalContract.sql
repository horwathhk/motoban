WITH contract AS (
SELECT * FROM rental_contracts LIMIT 1
), 
renter_user AS (
	SELECT renters.users_id_fkey AS the_renter_user, contract.* FROM renters 
	INNER JOIN contract ON renters_id = contract.renters_id_fkey
),
user_details AS (
	SELECT first_name, last_name, renter_user.* FROM renter_user 
	INNER JOIN users_details ON users_details.users_id_fkey = renter_user.the_renter_user
)
SELECT user_details.*, users.username AS the_renter_username FROM user_details
INNER JOIN users ON users.users_id = user_details.the_renter_user