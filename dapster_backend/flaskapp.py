from flask import Flask, render_template, request, Response
from cryptography.fernet import Fernet
import hashlib
app = Flask(__name__)
from s3upload import initialize_s3, upload_to_s3, download_from_s3


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
	data = file.filename + "%" + key + "%" +  data
	m.update(file.filename)
	return upload_to_s3(m.hexdigest(), data)

@app.route('/decrypt_file', methods=['GET'])
def decrypt_file():
	m = hashlib.md5()
	file_name = request.args.get("file")
	m.update(file_name)
	all_data = download_from_s3(m.hexdigest())
	key = all_data.split("%")[1]
	print(key)
	cipher_suite = Fernet(key)
	data = cipher_suite.decrypt(all_data[len(file_name) + 2 + len(key):])
	generator = (cell for row in data
					for cell in row)
	return Response(generator, mimetype="text/plain", headers={"Content-Disposition":
									"attachment;filename=" + file_name})


if __name__ == '__main__':
	initialize_s3()
	app.run(use_reloader=True, port=5000, threaded=True)
