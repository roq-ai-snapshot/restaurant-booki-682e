import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getWaiterById, updateWaiterById } from 'apiSdk/waiters';
import { waiterValidationSchema } from 'validationSchema/waiters';
import { WaiterInterface } from 'interfaces/waiter';
import { UserInterface } from 'interfaces/user';
import { RestaurantInterface } from 'interfaces/restaurant';
import { getUsers } from 'apiSdk/users';
import { getRestaurants } from 'apiSdk/restaurants';

function WaiterEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<WaiterInterface>(
    () => (id ? `/waiters/${id}` : null),
    () => getWaiterById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: WaiterInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateWaiterById(id, values);
      mutate(updated);
      resetForm();
      router.push('/waiters');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<WaiterInterface>({
    initialValues: data,
    validationSchema: waiterValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Waiters',
              link: '/waiters',
            },
            {
              label: 'Update Waiter',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Waiter
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <FormControl id="shift_start" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Shift Start
            </FormLabel>
            <DatePicker
              selected={formik.values?.shift_start ? new Date(formik.values?.shift_start) : null}
              onChange={(value: Date) => formik.setFieldValue('shift_start', value)}
            />
          </FormControl>
          <FormControl id="shift_end" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Shift End
            </FormLabel>
            <DatePicker
              selected={formik.values?.shift_end ? new Date(formik.values?.shift_end) : null}
              onChange={(value: Date) => formik.setFieldValue('shift_end', value)}
            />
          </FormControl>

          <NumberInput
            label="Uniform Number"
            formControlProps={{
              id: 'uniform_number',
              isInvalid: !!formik.errors?.uniform_number,
            }}
            name="uniform_number"
            error={formik.errors?.uniform_number}
            value={formik.values?.uniform_number}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('uniform_number', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <AsyncSelect<RestaurantInterface>
            formik={formik}
            name={'restaurant_id'}
            label={'Select Restaurant'}
            placeholder={'Select Restaurant'}
            fetcher={getRestaurants}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/waiters')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'waiter',
    operation: AccessOperationEnum.UPDATE,
  }),
)(WaiterEditPage);
