import { useState } from 'react';
import axios from 'axios';
import styles from './form.module.css';

const Form = () => {
    const [formData, setFormData] = useState({
        businessName: '',
        opportunityArea: '',
        persona: '',
        questions: '',
    });

    const [aiResponse, setAiResponse] = useState([]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const prompt = `Business Name: ${formData.businessName}\nOpportunity Area: ${formData.opportunityArea}\nPersona: ${formData.persona}\nBusiness Context and technologies being used: ${formData.questions}\n\nGenerate 5 good questions to ask to find out the critical business issues based on what you know about the business name and context: `;
            const response = await axios.post('/api/openai', { prompt });
            const questions = response.data.valueHighlight.split('\n');
            setAiResponse(questions);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };


    return (
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="businessName">Business Name:</label>
                        <input className={styles.input} type="text" name="businessName" value={formData.businessName} onChange={handleChange} />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="opportunityArea">Opportunity Area:</label>
                        <input className={styles.input} type="text" name="opportunityArea" value={formData.opportunityArea} onChange={handleChange} />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="persona">Persona:</label>
                        <input className={styles.input} type="text" name="persona" value={formData.persona} onChange={handleChange} />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="questions">Context:</label>
                        <textarea className={styles.input} name="questions" value={formData.questions} onChange={handleChange}></textarea>
                    </div>
                    <button className={styles.submitBtn} type="submit">Get Questions</button>
                </form>
                {aiResponse.length > 0 && (
                    <div className={styles.response}>
                        <h3>Follow-up Questions:</h3>
                        <ul className={styles.responseList}>
                            {aiResponse.map((question, index) => (
                                <li key={index} className={styles.responseItem}>
                                    {question}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Form;

