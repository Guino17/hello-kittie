from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# Simulamos una "base de datos" temporal (en memoria)
high_scores = {}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/gameover', methods=['POST'])
def game_over():
    name = request.form['name']
    score = int(request.form['score'])

    if name not in high_scores or score > high_scores[name]:
        high_scores[name] = score

    return render_template('gameover.html', name=name, score=score, best=high_scores[name])

if __name__ == '__main__':
    app.run(debug=True)

    
