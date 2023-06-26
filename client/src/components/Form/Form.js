import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './form.css';

const SongForm = () => {
  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    songId: Yup.number()
    .typeError('Song ID must be a number')
    .integer('Song ID must be an integer')
    .required('Song ID is required'),
    songName: Yup.string().required('Song Name is required'),
    songFile: Yup.mixed()
    .required('Song file is required')
    .test('fileFormat', 'Invalid file format. Only MP3 files are allowed.', (value) => {
      if (value) {
        return value.type === 'audio/mpeg';
      }
      return true;
    }),
  });

  // Function to handle form submission
  const handleSubmit = (values, { setSubmitting }) => {
    // Simulating form submission
    setTimeout(() => {
      console.log(values);
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 500);
  };

  return (
    <div>
      <h1>Create your own Playlist!!!</h1>
      <Formik
        initialValues={{
          songId: '',
          songName: '',
          songFile: null,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="form-content">
            <div>
              <label htmlFor="songId">Song ID:</label>
              <Field type="text" id="songId" name="songId" />
              <div className='error-message'>
              <ErrorMessage name="songId" component="div" className="error" />
              </div>
            </div>

            <div>
              <label htmlFor="songName">Song Name:</label>
              <Field type="text" id="songName" name="songName" />
              <div className='error-message'>
              <ErrorMessage name="songName" component="div" className="error" />
              </div>
            </div>

            <div>
              <label htmlFor="songFile">Song File:</label>
              <input
                type="file"
                id="songFile"
                name="songFile"
                onChange={(event) => {
                  setFieldValue('songFile', event.currentTarget.files[0]);
                }}
              />
              <div className='error-message'>
              <ErrorMessage name="songFile" component="div" className="error" />
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
