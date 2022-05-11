import AppDialog from '../../core/AppDialog'
import React, { useRef } from 'react'
import UserForm from './UserForm'
import { Formik, FormikProps } from 'formik';
import * as yup from 'yup';
import { User } from '../../interfaces';
import { useAddUserMutation, useGetUserByIdQuery } from '../../app/services/users';


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
    accountNumber: yup.number().required('Required'),
    PIN: yup.number().required('Required'),
    ccn: yup.number().required('Required'),
    balance: yup.number().required('Required'),
});

const UpdateUserForm: React.FC<Props> = ({ showModal, handleClose, id }) => {
    const { data } = useGetUserByIdQuery(id);

    const [addUser, { isError, isLoading }] = useAddUserMutation();
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
                        data ? data : {
                            fName: '',
                            lName: '',
                            email: '',
                            cin: '',
                            phone: '',
                            accountNumber: 0,
                            PIN: 0,
                            ccn: 0,
                            balance: 0,

                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        console.log(values)


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