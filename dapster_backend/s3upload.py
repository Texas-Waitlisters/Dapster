import boto3

client = boto3.client('s3')
s3 = boto3.resource('s3')
import hashlib

bucket_name = "sxswhackathondapsterbuckets"

def _get(bucket_name):
	response = ''
	try:
		response = client.head_bucket(Bucket=bucket_name)
	except Exception as e:
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
	except Exception as e:
		return "Failure"

def download_from_s3(file_name):
	obj = s3.Object(bucket_name = bucket_name, key = file_name)
	print(obj)
	return obj.get()['Body'].read()

def list_objects():
	all_objects = client.list_objects(Bucket = bucket_name);
	all_items = []
	m = hashlib.md5()
	if 'Contents' not in all_objects.keys():
		return all_items
	for content in all_objects['Contents']:
		all_body = download_from_s3(str(content['Key']))
		item = all_body.split("%")[0]
		print(item)
		all_items.append(item)
	return all_items

def list_owned_objects(owner):
	all_objects = client.list_objects(Bucket = bucket_name);
	all_items = []
	m = hashlib.md5()
	if 'Contents' not in all_objects.keys():
		return all_items
	for content in all_objects['Contents']:
		all_body = download_from_s3(str(content['Key']))
		item = all_body.split("%")[0]
		if owner == all_body.split("%")[2]:
			print(item)
			all_items.append(item)
	return all_items


def initialize_s3():
	if not _get(bucket_name):
		client.create_bucket(ACL='public-read', Bucket=bucket_name,
									  CreateBucketConfiguration={'LocationConstraint': 'us-west-2'})
	else:
		bucket = s3.Bucket(bucket_name)
		bucket.objects.all().delete()
		bucket.delete()
		client.create_bucket(ACL='public-read', Bucket=bucket_name,
									  CreateBucketConfiguration={'LocationConstraint': 'us-west-2'})
