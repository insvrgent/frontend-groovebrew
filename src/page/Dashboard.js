import React, { useState, useEffect } from 'react';
import SuperAdminComponent from '../components/SuperAdminComponent';
import AdminComponent from '../components/AdminComponent';

const YourComponent = ({ user }) => {

    const styles = {
        container: {
            fontFamily: '"Arial", sans-serif',
            margin: '0',
            padding: '0',
            boxSizing: 'border-box',
        },
        header: {
            backgroundColor: '#282c34',
            padding: '20px',
            color: 'white',
            textAlign: 'center',
        },
        logo: {
            height: '80px',
        },
        title: {
            fontSize: '2.5em',
        },
        mainContent: {
            padding: '20px',
        },
        section: {
            marginBottom: '20px',
        },
        sectionTitle: {
            fontSize: '1.5em',
            borderBottom: '2px solid #282c34',
            paddingBottom: '10px',
        },
        sectionText: {
            fontSize: '1.1em',
            lineHeight: '1.6em',
        },
        valuesList: {
            listStyleType: 'none',
            paddingLeft: '0',
        },
        footer: {
            backgroundColor: '#282c34',
            color: 'white',
            textAlign: 'center',
            padding: '10px',
            position: 'fixed',
            width: '100%',
            bottom: '0',
        }
    };

    return (
        <>
            {user && user.roleId === 0 ? (
                <SuperAdminComponent />
            ) : user && user.roleId === 1 ? (
                <AdminComponent />
            ) : (
                <div style={styles.container}>
                    {/* Header Section */}
                    <header style={styles.header}>
                        <img alt="Company Logo" style={styles.logo} />
                        <h1 style={styles.title}>Anda penikmat kopi nomor 1?</h1>
                    </header>

                    {/* Main Content Section */}
                    <main style={styles.mainContent}>
                        <section style={styles.section}>
                            <p style={styles.sectionText}>
                                atau anda hanya ingin uang uang nya saja?
                            </p>
                            <h2 style={styles.sectionTitle}>About Us</h2>
                            <p style={styles.sectionText}>

                            </p>
                        </section>

                        <section style={styles.section}>
                            <h2 style={styles.sectionTitle}>Our Mission</h2>
                            <p style={styles.sectionText}>
                                To create value for our customers through outstanding services and
                                innovative solutions, while fostering a culture of integrity and
                                respect within our organization.
                            </p>
                        </section>

                        <section style={styles.section}>
                            <h2 style={styles.sectionTitle}>Our Vision</h2>
                            <p style={styles.sectionText}>
                                To be a global leader in our industry, recognized for our customer-centric
                                approach and unwavering dedication to quality.
                            </p>
                        </section>

                        <section style={styles.section}>
                            <h2 style={styles.sectionTitle}>Our Values</h2>
                            <ul style={styles.valuesList}>
                                <li>Integrity</li>
                                <li>Innovation</li>
                                <li>Excellence</li>
                                <li>Customer Satisfaction</li>
                                <li>Teamwork</li>
                            </ul>
                        </section>
                    </main>

                    {/* Footer Section */}
                    <footer style={styles.footer}>
                        <p>&copy; {new Date().getFullYear()} Our Company. All rights reserved.</p>
                    </footer>
                </div>
            )}
        </>
    );
};

export default YourComponent;
