import Installation from '@components/Installation'
import NamadaInstallation from '@components/Namada/Installation'
import { getLayout } from '@layouts/dashboard'
import { generateProjectPaths, getProjects } from '@utils/projectUtils'
import { useRouter } from 'next/router'

const type = 'testnet'

const InstallationPage = () => {
	const router = useRouter()
	const { projectName } = router.query

	let InstallationComponent
	if (projectName === 'namada') {
		InstallationComponent = NamadaInstallation
	} else {
		InstallationComponent = Installation
	}

	return <InstallationComponent name={projectName} type={type} />
}

export async function getStaticPaths() {
	const paths = generateProjectPaths(type)
	return { paths, fallback: 'blocking' }
}

export async function getStaticProps({ params }) {
	const projects = getProjects(type)
	const project = projects.find(p => p.id === params.projectName)
	return { props: { project }, revalidate: 1 }
}

InstallationPage.getLayout = getLayout
export default InstallationPage
