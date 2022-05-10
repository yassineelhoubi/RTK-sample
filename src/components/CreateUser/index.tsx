import AppDialog from '../../core/AppDialog'
import React, { useRef } from 'react'
import AddUser from './AddUser'
import { Formik, FormikProps } from 'formik';
import * as yup from 'yup';
import { User } from '../../interfaces';
import { useAddUserMutation } from '../../app/services/users';


interface Props {
    showModal: boolean
    handleCloseModal: () => void;
    refetch: () => void;
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

const CreateUserContainer: React.FC<Props> = ({ showModal, handleCloseModal, refetch }) => {

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
                title="Create User"
                dividers
                sxStyle={{
                    '& .MuiPaper-root:hover': {
                        '& .btn-action-view': {
                            opacity: 1,
                            visibility: 'visible',
                        },
                    },
                }}
                onClose={() => handleCloseModal()}
                open={showModal}
                actionTitle='Submit'
                fullHeight
                onSubmit={() => {
                    handleSubmit()
                }}
            >

                <Formik
                    innerRef={formRef}
                    initialValues={{
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
                        addUser(values)
                            .then(() => {
                                console.log('success')
                                handleCloseModal()
                                refetch()
                            })
                            .catch((err) => {
                                console.log(err)
                            })

                    }}
                >
                    {({ values, setFieldValue }) => (
                        <AddUser
                            values={values as User}
                            setFieldValue={setFieldValue}
                        />
                    )}
                </Formik>
            </AppDialog>
        </>
    )
}

export default CreateUserContainer