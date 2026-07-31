def predict_default(model, input_data):
    predictions = model.predict(input_data)
    probabilities = model.predict_proba(input_data)

    print("=" * 60)
    print("PREDICT_PROBA OUTPUT")
    print(probabilities[:5])
    print("Shape:", probabilities.shape)
    print("=" * 60)

    return predictions, probabilities