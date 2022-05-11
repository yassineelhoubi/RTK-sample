import AppDialog from '../../core/AppDialog'
import React, { useRef } from 'react'
import UserForm from './UserForm'
import { Formik, FormikProps } from 'formik';
import * as yup from 'yup';
import { User } from '../../interfaces';
import { useGetUserByIdQuery, useUpdateUserMutation } from '../../app/services/users';


interface Props {
    showModal: boolean
    handleClose: () => void;
    id: string;


}
const validationSchema = yup.object().shape({
    fName: yup.string().required('Required'),
    lName: yup.string().required('Required'),
    email: yup.string().required('Required'),
    cin: yup.string().required('Required'),
    phone: yup.string().required('Required'),
    PIN: yup.number().required('Required'),
    ccn: yup.number().required('Required'),
});

const UpdateUserForm: React.FC<Props> = ({ showModal, handleClose, id }) => {
    const { data } = useGetUserByIdQuery(id);


    const [updateUser, { isError, isLoading }] = useUpdateUserMutation();
    const formRef = useRef<FormikProps<User>>(null);

    const handleSubmit = () => {
        if (formRef.current) {
            formRef.current.handleSubmit()
        }
    }

    return (
        <>
            {isLoading && <div>Loading...</div>}
            <AppDialog
                title="Update User"
                dividers
                sxStyle={{
                    '& .MuiPaper-root:hover': {
                        '& .btn-action-view': {
                            opacity: 1,
                            visibility: 'visible',
                        },
                    },
                }}
                onClose={() => handleClose()}
                open={showModal}
                actionTitle='Submit'
                fullHeight
                onSubmit={() => {
                    handleSubmit()
                }}
            >

                <Formik
                    innerRef={formRef}
                    initialValues={
                        {
                            fName: data ? data.fName : "",
                            lName: data ? data.lName : "",
                            email: data ? data.email : "",
                            cin: data ? data.cin : "",
                            phone: data ? data.phone : "",
                            PIN: data ? data.PIN : 0,
                            ccn: data ? data.ccn : 0,

                        }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        console.log(values)
                        // values._id = data ? data._id : ''
                        console.log(values)
                        let Values = {
                            ...values,
                            _id: data ? data._id : ''
                        }
                        updateUser(Values)
                            .then(() => {
                                console.log('success')
                                handleClose()
                            })
                            .catch((err) => {
                                console.log(err)
                            }
                            )



                    }}
                >
                    {({ values, setFieldValue }) => (
                        <UserForm
                            values={values as User}
                            setFieldValue={setFieldValue}
                        />
                    )}
                </Formik>
            </AppDialog>
        </>
    )
}

export default UpdateUserForm