# 🛡️ Prompt Injection Attack Detection using T5-small
## A Transformer-based System for Securing LLM Applications

This repository presents a complete implementation, evaluation, and comparative study of Prompt Injection Attack Detection using the **T5-small** transformer model. The system classifies user prompts as either **Clean (0)** or **Injected (1)** to protect Large Language Model (LLM) applications from adversarial manipulation.

---

## 📘 Table of Contents
* [📌 Overview](#overview)
* [📊 Dataset Analysis](#dataset-analysis)
* [💻 Model Architecture & Training](#model-architecture--training)
* [🧪 Evaluation Results](#evaluation-results)
* [🆚 Comparative Analysis](#comparative-analysis)
* [🚀 Quick Start](#quick-start)
* [🧰 Technologies & Dependencies](#technologies--dependencies)
* [🔮 Future Work](#future-work)
* [📄 License](#license)

---

## 📌 Overview

Prompt Injection is a critical security vulnerability that allows an attacker to embed malicious instructions into a prompt to override system behavior or extract restricted information from an LLM.

This project frames prompt injection detection as a binary classification task using the T5 text-to-text paradigm:

> `classify: <text> → "positive" (Injected) or "negative" (Clean)`

## 📊 Dataset Analysis

The dataset consists of 327,154 total samples, split as follows:

| Class | Count |
| :--- | :---: |
| **Clean (0)** | 165,628 |
| **Injected (1)** | 161,526 |

The dataset is balanced and suitable for robust training.

### Key Observations
* Injected prompts tend to be longer (higher character & word counts).
* Length-based features overlap significantly, making them insufficient alone for robust detection.
* Transformers are ideal for capturing the subtle semantic cues of injection attacks.

### EDA Visualizations
The full exploratory data analysis (EDA) is visible in the notebook, including feature distributions and correlations.

![](./images/data.jpg)

## 💻 Model Architecture & Training

### 🧹 Preprocessing
1.  URLs, punctuation, digits, and emojis were removed using a custom cleaning function.
2.  Labels mapped: `0 → "negative"`, `1 → "positive"`.
3.  T5 prefix added: `classify: <text>`.
4.  Tokenization settings:
    * Max input length: `128`
    * Max target length: `5`

### 🤖 Model
Fine-tuning was performed on the encoder-decoder architecture of the **T5ForConditionalGeneration** model (`t5-small` variant).

| Configuration | Value |
| :--- | :--- |
| **Epochs** | 7 (Stopped via early stopping) |
| **Early Stopping** | Patience = 5 |
| **Optimizer** | AdamW |
| **Learning Rate** | $3 \times 10^{-4}$ |

## 🧪 Evaluation Results

The T5-small model achieved high performance on the test set, demonstrating robust detection capabilities.

| Metric | Score |
| :--- | :---: |
| **Accuracy** | **0.9908** |
| **Precision** | 0.9945 |
| **Recall** | 0.9868 |
| **F1-Score** | 0.9906 |
| **ROC-AUC** | 0.9907 |
| **MCC** | 0.9816 |
| **Cohen’s Kappa** | 0.9816 |

### Performance Visualizations

#### Training Curves (Loss and Accuracy)
![](./images/t5_small_training_curves.png)

#### Confusion Matrix
![](./images/t5_small_confusion_matrix.png)

#### ROC Curve
![](./images/t5_small_roc_curve.png)

## 🆚 Comparative Analysis

The T5-small model was rigorously benchmarked against 13 other models across three categories:

| Category | Models Benchmarked |
| :--- | :--- |
| **Transformers** | T5-small, BERT, DistilBERT |
| **Deep Learning** | LSTM, BiLSTM, GRU, BiGRU, CNN |
| **Machine Learning** | LinearSVC, Logistic Regression, Ridge, Random Forest, ExtraTrees, AdaBoost, GradientBoosting, LightGBM, DecisionTree |

### Radar Chart
The chart visually compares the performance metrics of the top models.

![](./images/radar.jpg)

### Key Insights
* **Transformers Outperform:** The Transformer-based models (T5-small, BERT, DistilBERT) consistently outperformed all Deep Learning and traditional ML models across all metrics.
* **T5-small Efficiency:** T5-small achieves an excellent balance of model size, training speed, and superior accuracy, making it a highly practical choice for deployment.
* **ML Limitations:** Traditional ML methods struggled most with the task, highlighting the need for advanced semantic understanding offered by modern NLP models for injection detection.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

2. Train the Model(This command executes the training process defined in the notebook, saving the model weights to models/best_t5.pth.)Bashpython train_t5.py
3. Evaluate the Model(This command loads the saved model and computes the final evaluation metrics on the test set.)Bashpython evaluate.py
   
## 🧰 Technologies & Dependencies
ComponentVersion/LibraryPython3.11Core ML/DLPyTorchTransformersHuggingFace Transformers (T5ForConditionalGeneration, T5Tokenizer)Data HandlingHuggingFace Datasets, NumPy, PandasML/MetricsScikit-learnVisualizationMatplotlib, Seaborn
## 🔮 Future Work
The following steps are planned to expand and enhance the prompt injection detection system:Model Scaling: Test larger T5 models (e.g., T5-base, T5-large) or evaluate encoder-only architectures such as RoBERTa or DeBERTa for potential performance gains.Adversarial Robustness: Integrate adversarial training techniques (e.g., HotFlip or AutoPrompt) into the pipeline to enhance the model's robustness against sophisticated, unseen attacks.Real-time Deployment: Develop a high-performance, real-time detector API using frameworks like FastAPI.Multilingual Support: Expand testing and fine-tuning to include multilingual injection datasets.Explainability: Implement LIME or SHAP methods to provide model explainability, helping to understand why a prompt is flagged as injected.
## 📄 License
This project is licensed under the MIT License.
