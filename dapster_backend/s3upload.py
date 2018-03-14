import boto3

client = boto3.client('s3')
s3 = boto3.resource('s3')

bucket_name = "sxswhackathondapsterbuckets"

def _get(bucket_name):
	response = ''
	try:
		response = client.head_bucket(Bucket=bucket_name)
	except Exception as e:
		# print(e)
		# traceback.print_exc(file=sys.stdout)

		response_code = e.response['Error']['Code']
		if response_code == '404':
			return False
		elif response_code == '200':
			return True
		else:
			raise e
	if response['ResponseMetadata']['HTTPStatusCode'] == 200:
		return True
	else:
		return False

def upload_to_s3(file_name, file_data):
	try:
		client.put_object(ACL='public-read',Key= file_name, Body = file_data, Bucket = bucket_name)
		return "Success"
	except e as Exception:
		return "Failure"

def download_from_s3(file_name):
	obj = s3.Object(bucket_name = bucket_name, key = file_name)
	print(obj)
	return obj.get()['Body'].read()

def initialize_s3():
	if not _get(bucket_name):
		client.create_bucket(ACL='public-read', Bucket=bucket_name,
									  CreateBucketConfiguration={'LocationConstraint': 'us-west-2'})
