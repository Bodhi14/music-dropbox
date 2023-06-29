import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './form.css';

const SongForm = () => {

  const [songs, setSongs] = useState([]);
  const linkExp = /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm
  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    songId: Yup.number()
      .typeError('Song ID must be a number')
      .integer('Song ID must be an integer')
      .required('Song ID is required'),
    songName: Yup.string().required('Song Name is required'),
    songLink: Yup.string().required('Song Link is required').matches(linkExp, 'Not a valid link')
  });

  // Function to handle form submission
  const handleSubmit = (values, { setSubmitting }) => {
    // Simulating form submission
    setTimeout(async () => {
      const resp = await axios.post('/api', {
        songId: values.songId,
        songName: values.songName,
        songLink: values.songLink,
      }).then((res) => {
        console.log("Data is sent to the express server");
        console.log(res.data);
        alert(JSON.stringify(values, null, 2) + "\nis added");
      }).catch(() => {
        console.log("Data is not sent to the express server");
      });
      
      setSubmitting(false);
    }, 500);
  };

  const getSongs = async () => {
    axios.get('/api')
      .then((res) => {
        let data = res.data;
        setSongs(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  

  const deletehandler = async(id) => {
        await axios.delete(`/api/${id}`)
        .then((res) => {
          alert("Song is removed from the library");
          console.log(res);
          })
        .catch((err) => {
            console.log(err);
          });
      
  }

  useEffect(() => {
    getSongs();
  }, [songs])

  return (
    <React.Fragment>
      <div className="container">
        <div className="jumbotron bg-light text-dark mb-4">
          <h1 className="display-4">Create your own Playlist!!!</h1>
          <Formik
            initialValues={{
              songId: '',
              songName: '',
              songLink: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="form-content">
                <div className="form-group">
                  <label htmlFor="songId">Song ID:</label>
                  <Field type="text" className="form-control" id="songId" name="songId" />
                  <div className="error-message">
                    <ErrorMessage name="songId" component="div" className="error" />
                  </div>
                </div>
                <br />
                <div className="form-group">
                  <label htmlFor="songName">Song Name:</label>
                  <Field type="text" className="form-control" id="songName" name="songName" />
                  <div className="error-message">
                    <ErrorMessage name="songName" component="div" className="error" />
                  </div>
                </div>
                <br />
                <div className="form-group">
                  <label htmlFor="songLink">Song Link:</label>
                  <Field type="text" className="form-control" id="songLink" name="songLink" />
                  <div className="error-message">
                    <ErrorMessage name="songLink" component="div" className="error" />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary mt-3" disabled={isSubmitting}>
                  Submit
                </button>
              </Form>
            )}

          </Formik>
        </div>

        <h2 className="mt-5">Your music library:</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col" className="bg-secondary text-white">Song ID</th>
              <th scope="col" className="bg-secondary text-white">Song Name</th>
              <th scope="col" className="bg-secondary text-white">Play</th>
              <th scope="col" className="bg-secondary text-white">Remove</th>
            </tr>
          </thead>
          <tbody>

            {Array.from(songs).map((song) => {
              const key = song._id;
              return (
                <tr key={key}>
                  <td>{song.songID}</td>
                  <td>{song.songName}</td>
                  <td><a href={song.songLink}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-play-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"/>
</svg></a></td>
                  <td><button className="btn btn-danger" onClick={() => deletehandler(key)}>Delete</button></td>
                </tr>
              )

            })}

          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

export default SongForm;

