import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const CreatorAndLister = ({
    title,
    createFunction,
    listItems,
    renderItem,
    buttonText,
    inputs,
    parentData,
    itemIdKey,
    layers, // Array of layer functions
}) => {
    const [items, setItems] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState(() => {
        const initialFormState = {};
        inputs.forEach((input) => {
            initialFormState[input.name] = '';
        });
        return initialFormState;
    });
    const [selectedItem, setSelectedItem] = useState(null);

    const fetchItems = async () => {
        try {
            setIsLoading(true);
            const response = await listItems();
            setItems(response.responseData);
            setIsLoading(false);
        } catch (error) {
            console.error(`Error fetching ${title.toLowerCase()}:`, error);
        }
    };

    const handleRegister = async () => {
        try {
            if (!createFunction) return;

            const response = await createFunction(formData, parentData !== undefined ? parentData[itemIdKey] : "");
            if (response.success) {
                fetchItems(); // Refresh the items list
                setFormData(() => {
                    const resetFormData = {};
                    inputs.forEach((input) => {
                        resetFormData[input.name] = '';
                    });
                    return resetFormData;
                });
                setIsExpanded(false); // Collapse the form after successful registration
            } else {
                console.error(`Register ${title.toLowerCase()} failed`);
            }
        } catch (error) {
            console.error(`Error occurred while registering ${title.toLowerCase()}:`, error.message);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    useEffect(() => {
        if (parentData) {
            console.log('Parent Data:', parentData);
        }
    }, [parentData]);

    const handleExpand = (expand) => {
        setIsExpanded(expand);
    };

    const handleInputChange = (e, inputName) => {
        setFormData({ ...formData, [inputName]: e.target.value });
    };

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    const closeModal = () => {
        setSelectedItem(null);
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>{title}</h1>
            <div style={styles.userList}>
                <div style={{ ...styles.userItem, ...(isExpanded ? styles.expandedUserItem : {}) }}>
                    {!isExpanded && (
                        <div style={styles.addButton} onClick={() => handleExpand(true)}>
                            +
                        </div>
                    )}
                    {isExpanded && (
                        <div style={styles.formContainer}>
                            {inputs.map((input, index) => (
                                <input
                                    key={index}
                                    type={input.type}
                                    name={input.name}
                                    placeholder={input.placeholder}
                                    value={formData[input.name]}
                                    onChange={(e) => handleInputChange(e, input.name)}
                                    style={styles.input}
                                />
                            ))}
                            <div style={styles.buttonContainer}>
                                <button onClick={() => handleExpand(false)} style={styles.cancelButton}>
                                    Cancel
                                </button>
                                <button onClick={handleRegister} style={styles.registerButton}>
                                    {buttonText}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                {items &&
                    items.map((item) => (
                        <div key={item[itemIdKey]} style={styles.userItem} onClick={() => handleItemClick(item)}>
                            {renderItem(item)}
                        </div>
                    ))}
            </div>
            {isLoading && <h1>Loading....</h1>}
            {selectedItem && (
                <Modal isOpen={!!selectedItem} onRequestClose={closeModal} style={modalStyles}>
                    <h2>Selected {title}: {selectedItem[itemIdKey]}</h2>
                    {layers.map((layer, index) => (
                        <div key={index}>
                            {layer(selectedItem)}
                        </div>
                    ))}
                </Modal>
            )}
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        textAlign: 'center',
    },
    header: {
        marginBottom: '20px',
    },
    addButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        fontSize: '24px',
        color: '#fff',
        backgroundColor: '#007bff',
        borderRadius: '8px',
        cursor: 'pointer',
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },
    input: {
        width: '80%',
        padding: '10px',
        margin: '2px 0',
        borderRadius: '8px',
        border: '1px solid #ccc',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '80%',
        marginTop: '10px',
    },
    cancelButton: {
        padding: '10px 20px',
        fontSize: '16px',
        color: '#fff',
        backgroundColor: '#dc3545',
        borderRadius: '8px',
        cursor: 'pointer',
    },
    registerButton: {
        padding: '10px 20px',
        fontSize: '16px',
        color: '#fff',
        backgroundColor: '#28a745',
        borderRadius: '8px',
        cursor: 'pointer',
    },
    userList: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    userItem: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        height: '60px',
        margin: '10px 0',
        backgroundColor: '#f1f1f1',
        borderRadius: '8px',
        textAlign: 'left',
        cursor: 'pointer',
        transition: 'height 0.3s ease',
    },
    expandedUserItem: {
        height: 'auto',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
};

const modalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '80%', // Set modal width to 80%
    },
};

export default CreatorAndLister;
