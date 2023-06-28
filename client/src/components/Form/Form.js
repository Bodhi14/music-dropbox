import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './form.css';

const SongForm = () => {

  const [songs, setSongs] = useState([]);

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    songId: Yup.number()
      .typeError('Song ID must be a number')
      .integer('Song ID must be an integer')
      .required('Song ID is required'),
    songName: Yup.string().required('Song Name is required'),
    songLink: Yup.string().required('Song Link is required')
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
        console.log(res.data)
      }).catch(() => {
        console.log("Data is not sent to the express server");
      });
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 500);
  };

  const getSongs = async () => {
    axios.get('/api')
      .then((res) => {
        let data = res.data;
        console.log(data);
        setSongs(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getSongs();
  }, [])

  return (
    <React.Fragment>
      <div class="container">
        <div class="jumbotron bg-light text-dark mb-4">
          <h1 class="display-4">Create your own Playlist!!!</h1>
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
              <Form class="form-content">
                <div class="form-group">
                  <label htmlFor="songId">Song ID:</label>
                  <Field type="text" class="form-control" id="songId" name="songId" />
                  <div class="error-message">
                    <ErrorMessage name="songId" component="div" className="error" />
                  </div>
                </div>
                <br />
                <div class="form-group">
                  <label htmlFor="songName">Song Name:</label>
                  <Field type="text" class="form-control" id="songName" name="songName" />
                  <div class="error-message">
                    <ErrorMessage name="songName" component="div" className="error" />
                  </div>
                </div>
                <br />
                <div class="form-group">
                  <label htmlFor="songLink">Song Link:</label>
                  <Field type="text" class="form-control" id="songLink" name="songLink" />
                  <div class="error-message">
                    <ErrorMessage name="songLink" component="div" className="error" />
                  </div>
                </div>

                <button type="submit" class="btn btn-primary mt-3" disabled={isSubmitting}>
                  Submit
                </button>
              </Form>
            )}

          </Formik>
        </div>

        <h2 class="mt-5">Your music library:</h2>
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col" class="bg-secondary text-white">Song ID</th>
              <th scope="col" class="bg-secondary text-white">Song Name</th>
              <th scope="col" class="bg-secondary text-white">Play</th>
            </tr>
          </thead>
          <tbody>

            {songs.map((song) => {
              return (
                <tr>
                  <td>{song.songID}</td>
                  <td>{song.songName}</td>
                  <td><a href={song.songLink}><i class="fas fa-user"/>Play</a></td>
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