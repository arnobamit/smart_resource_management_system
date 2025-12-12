# 🛡️ Prompt Injection Attack Detection using T5-small and Comparative Analysis

This project implements and evaluates a text classification model using **T5-small** for the task of detecting **Prompt Injection Attacks** against Large Language Models (LLMs). The model is trained to classify prompts as either "Clean" (label 0) or "Injected" (label 1).

The repository includes a comprehensive comparative analysis, benchmarking the T5-small model's performance against several other transformer, deep learning (DL), and traditional machine learning (ML) models.

## 📝 Project Overview

Prompt Injection is a security vulnerability where an attacker manipulates an LLM's behavior by inserting malicious instructions into a prompt, potentially overriding its system-level instructions or extracting confidential data. Effective detection of these adversarial prompts is crucial for securing LLM-powered applications.

This project uses a binary classification approach (using the T5 text-to-text format: `classify: `) to distinguish between benign and injected prompts.

## 📊 Dataset Analysis and Feature Engineering

The analysis started with an exploratory data analysis (EDA) of the combined dataset. The dataset is well-balanced, with 165,628 "Clean" samples (label 0) and 161,526 "Injected" samples (label 1).

| Feature | Clean (0) | Injected (1) | Observation |
| :--- | :---: | :---: | :--- |
| **Total Samples** | 165,628 | 161,526 | The dataset is well-balanced. |
| **Character Count** | Lower | Higher | Injected prompts tend to be longer. |
| **Word Count** | Lower | Higher | Similar trend to Character Count; injected prompts use more words. |

### Exploratory Data Analysis Visualizations

The initial EDA confirmed that basic length features alone are insufficient for robust classification, as the distributions of "Clean" and "Injected" prompts heavily overlap.

* **Feature Distribution Plots**
    
    * **Note:** This composite image shows the 3D scatter, pair plots, violin plot, and binned distributions.
    
    ![](./path/to/data.jpg)

## 💻 Model Implementation (T5-small)

The **T5-small** (Text-to-Text Transfer Transformer) model was fine-tuned for the binary classification task.

### Preprocessing & Tokenization
1.  **Text Cleaning:** A custom function (`clean_text`) was applied to remove URLs, digits, punctuation, and emojis.
2.  **Label Mapping:** Numeric labels were mapped to text targets: `{0: "negative", 1: "positive"}`.
3.  **T5 Tokenization:** Input texts were prefixed with the T5 task prefix: `"classify: " + text`.
4.  **Sequence Lengths:** The maximum input length was set to `128` and the maximum target (label) length was set to `5`.

### Training and Results

The model was trained for 7 epochs using Early Stopping (patience=5), achieving exceptional performance.

| Metric | Score |
| :--- | :---: |
| **Accuracy** | **0.9908** |
| **Precision** | 0.9945 |
| **Recall** | 0.9868 |
| **F1-Score** | 0.9906 |
| **ROC-AUC** | 0.9907 |
| **MCC** | 0.9816 |
| **Cohen's Kappa** | 0.9816 |

### Performance Visualizations

#### 1. Training Curves (Loss and Accuracy)
The curves show excellent convergence and stability, with validation loss tracking training loss closely, and high accuracy achieved early in the process.

![](./path/to/t5_small_training_curves.png)

#### 2. Confusion Matrix
The confusion matrix highlights the minimal misclassifications, confirming the model's high predictive power.

![](./path/to/t5_small_confusion_matrix.png)

#### 3. ROC Curve
The Area Under the Curve (AUC) score of **0.991** indicates a near-perfect classifier performance.

![](./path/to/t5_small_roc_curve.png)

## 📈 Comparative Analysis

The T5-small model's performance was benchmarked against a suite of other models to contextualize its effectiveness.

* **Transformers:** BERT, DistilBERT, T5-small
* **Deep Learning:** BiGRU, BiLSTM, GRU, CNN, LSTM
* **Machine Learning:** LinearSVC, LogisticReg, Ridge, RandomForest (RF), ExtraTrees, AdaBoost, LGBM, GradientBoost, DecisionTree

### Performance Radar Chart

![](./path/to/radar.jpg)

**Key Takeaways from the Comparison:**
* **Transformers Dominance:** T5-small, along with the other transformer models (BERT/DistilBERT), significantly outperforms traditional Deep Learning and Machine Learning models across all major metrics.
* **T5-small Strength:** The T5-small model delivers highly competitive performance among the transformers, offering an excellent balance of speed, size, and classification accuracy for this security task.

## ⚙️ Technologies and Dependencies

The project uses the Python ecosystem for data manipulation, model training, and evaluation.

```python
# Core Libraries and Frameworks
import numpy as np
import pandas as pd
import torch
from sklearn.model_selection import train_test_split
from transformers import T5Tokenizer, T5ForConditionalGeneration
from torch.utils.data import DataLoader
from datasets import Dataset

# Visualization and Metrics
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score, matthews_corrcoef,
    roc_auc_score, confusion_matrix, cohen_kappa_score, ConfusionMatrixDisplay, roc_curve, auc
)
