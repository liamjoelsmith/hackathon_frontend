import React, { useEffect, useState, } from 'react';

function FetchAPI () {
    const [serverURL, setServerURL] = useState('https://jsonplaceholder.typicode.com/posts');  // replace with server url
    const [data, setData] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    // Get Method
    const apiGet = () => {
        fetch(serverURL)
            .then((response) => response.json())
            .then(
                // set data
                (json) => {
                    console.log(json);
                    setData(json);
                },
                // error handling
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
    };
}

export default FetchAPI;