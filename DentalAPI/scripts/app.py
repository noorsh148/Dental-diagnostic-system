from flask import Flask , render_template,request,jsonify
import os
import werkzeug

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')



@app.route('/DentalAPI',methods=["TEETH_PREDICTION"])
def upload():
    if(request.method == "TEETH_PREDICTION"):
        imagefile = request.files['image']
        filename = werkzeug.utils.secure_filename(imagefile.filename)
        imagefile.save("./X-Ray-image/" + filename)
        #TODO prediction = CoolStuff(imageFile)
        os.remove("./X-Ray-image/" + filename);
        # return jsonify({"predictionResult":prediction})


if __name__ == "__main__":
    app.run(debug=True,port=5000)