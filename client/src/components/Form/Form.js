import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './form.css';

const SongForm = () => {

  const [songs, setSongs] = useState();

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
    setTimeout(async() => {
      const resp = await axios.post('/api', {
        songId: values.songId,
        songName: values.songName,
        songLink: values.songLink,
      }).then((res)=> {
        console.log("Data is sent to the express server");
        console.log(res.data)
      }).catch(()=> {
        console.log("Data is not sent to the express server");
      });
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 500);
  };

  const getSongs = async() => {
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

  useEffect(()=> {
      getSongs();
  }, [])

  return (
    <div>
      <h1>Create your own Playlist!!!</h1>
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
            <div>
              <label htmlFor="songId">Song ID: </label>
              <Field type="text" id="songId" name="songId" />
              <div className='error-message'>
              <ErrorMessage name="songId" component="div" className="error" />
              </div>
            </div>

            <div>
              <label htmlFor="songName">Song Name: </label>
              <Field type="text" id="songName" name="songName" />
              <div className='error-message'>
              <ErrorMessage name="songName" component="div" className="error" />
              </div>
            </div>

            <div>
              <label htmlFor="songLink">Song Link: </label>
              <Field type="text" id="songLink" name="songLink" />
              <div className='error-message'>
              <ErrorMessage name="songLink" component="div" className="error" />
              </div>
            </div>

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SongForm;
