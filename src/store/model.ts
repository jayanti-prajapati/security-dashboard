

export interface ProductData {
    uuid: string
    name: string
    type: string
    component: Component
    alertInfo: AlertInfo
    project: Project
    product: Product
    vulnerability: Vulnerability
    topFix: TopFix
    effective: string
    threatAssessment: ThreatAssessment
    exploitable: boolean
    scoreMetadataVector: string
    malicious: boolean
}

export interface Component {
    uuid: string
    name: string
    description: string
    componentType: string
    libraryType: string
    directDependency: boolean
    references: References
    groupId: string
    artifactId: string
    version: string
}

export interface References {
    url: string
    homePage: string
    genericPackageIndex: string
}

export interface AlertInfo {
    status: string
    comment: Comment
    detectedAt: string
    modifiedAt: string
}

export interface Comment { }

export interface Project {
    uuid: string
    name: string
    path: string
}

export interface Product {
    uuid: string
    name: string
}

export interface Vulnerability {
    name: string
    type: string
    description: string
    score: number
    severity: string
    publishDate: string
    modifiedDate: string
    vulnerabilityScoring: VulnerabilityScoring[]
}

export interface VulnerabilityScoring {
    score: number
    severity: string
    type: string
}

export interface TopFix {
    id: number
    vulnerability: string
    type: string
    origin: string
    url: string
    fixResolution: string
    date: string
    message: string
}

export interface ThreatAssessment {
    exploitCodeMaturity: string
    epssPercentage: number
}
