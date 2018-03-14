from flask import Flask, render_template, request, Response
from cryptography.fernet import Fernet
import hashlib
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
from s3upload import initialize_s3, upload_to_s3, download_from_s3, list_objects, list_owned_objects, grant_permissions, list_owned_with_grantee
import json


@app.route('/')
def upload_stuff():
	return render_template('index.html')


@app.route('/encrypt_file', methods=['POST'])
def encrypt_file():
	m = hashlib.md5()
	key = Fernet.generate_key()
	cipher_suite = Fernet(key)
	file = request.files['file']
	data = cipher_suite.encrypt(file.read())
	data = file.filename + "%" + key + "%" +  request.form["owner"] + "%" + data
	m.update(file.filename)
	return upload_to_s3(m.hexdigest(), data)

@app.route('/decrypt_file', methods=['GET'])
def decrypt_file():
	m = hashlib.md5()
	file_name = request.args.get("file")
	m.update(file_name)
	all_data = download_from_s3(m.hexdigest())
	key = all_data.split("%")[1]
	owner = all_data.split("%")[2]
	cipher_suite = Fernet(key)
	data = cipher_suite.decrypt(all_data[len(file_name) + 3 + len(key) + len(owner) :])

	generator = (cell for row in data
					for cell in row)
	return Response(generator, mimetype="text/plain", headers={"Content-Disposition":
									"attachment;filename=" + file_name})

@app.route('/list_all_items', methods=['GET'])
def get_all():
	return json.dumps(list_objects())

@app.route('/list_all_owned_items', methods=['GET'])
def get_all_owned():
	return json.dumps(list_owned_objects(request.args.get("owner")))

@app.route('/give_perm', methods=['GET'])
def give_permission():
	return grant_permissions(request.args.get("owner"), request.args.get("file"), request.args.get("granted"))


@app.route('/list_all_owned_items_with_grantees', methods=['GET'])
def get_all_owned_with_grantees():
	return json.dumps(list_owned_with_grantee(request.args.get("owner")))


if __name__ == '__main__':
	initialize_s3()
	app.run(use_reloader=True, port=5000, threaded=True)
