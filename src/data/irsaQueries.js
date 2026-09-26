// NASA / IPAC IRSA TAP & ADQL Integration Metadata
// IVOA TAP Endpoint: https://irsa.ipac.caltech.edu/TAP

export const IRSA_CONFIG = {
  endpoint: 'https://irsa.ipac.caltech.edu/TAP',
  syncUrl: 'https://irsa.ipac.caltech.edu/TAP/sync',
  tableArtifact: 'spherex.artifact',
  tablePlane: 'spherex.plane',
  sampleQueries: [
    {
      title: 'SPHEREx Multi-Epoch Temporal Cone Search',
      adql: `SELECT TOP 20 
  ra, dec, epoch, band_idx, wavelength_um, flux_mjy_sr, snr, obs_time
FROM 
  spherex.artifact
WHERE 
  CONTAINS(POINT('J2000', ra, dec), CIRCLE('J2000', 67.1754, 16.2023, 0.05)) = 1
ORDER BY 
  obs_time ASC;`
    },
    {
      title: 'Planet 9 Infrared Methane Band (3.31 µm) Query',
      adql: `SELECT 
  artifact_id, ra, dec, wavelength_um, flux_mjy_sr, uncert_mjy_sr
FROM 
  spherex.artifact
WHERE 
  wavelength_um BETWEEN 3.25 AND 3.35
  AND flux_mjy_sr > 0.08
  AND snr > 5.0;`
    },
    {
      title: 'SPHEREx Calibration Level-3 FITS Header Metadata',
      adql: `SELECT 
  plane_id, mission_name, survey_pass, date_obs, crval1, crval2, cdelt1, cdelt2
FROM 
  spherex.plane
WHERE 
  survey_pass IN (1, 2, 3) 
  AND status = 'CALIBRATED';`
    }
  ],
  fitsHeaderSample: [
    { key: 'SIMPLE', val: 'T', comment: 'Java FITS: Standard FITS format' },
    { key: 'BITPIX', val: '-32', comment: 'IEEE single precision floating point' },
    { key: 'NAXIS', val: '2', comment: '2-dimensional image' },
    { key: 'NAXIS1', val: '2048', comment: 'Pixels along fast axis' },
    { key: 'NAXIS2', val: '2048', comment: 'Pixels along slow axis' },
    { key: 'EXTEND', val: 'T', comment: 'Extensions may be present' },
    { key: 'TELESCOP', val: "'SPHEREx'", comment: 'Spectro-Photometer for the History of the Universe' },
    { key: 'INSTRUME', val: "'SPHEREx_NIR'", comment: 'Near-Infrared Wide-Field Spectrometer' },
    { key: 'FILTER', val: "'LVF_ARRAY'", comment: 'Linear Variable Filter 0.75-5.0um' },
    { key: 'BUNIT', val: "'MJy/sr'", comment: 'Brightness units in MegaJanskys per steradian' },
    { key: 'EQUINOX', val: '2000.0', comment: 'Equinox of celestial coordinates' },
    { key: 'RADESYS', val: "'ICRS'", comment: 'Astrometric reference system' },
    { key: 'CTYPE1', val: "'RA---TAN'", comment: 'Gnomonic projection in Right Ascension' },
    { key: 'CTYPE2', val: "'DEC--TAN'", comment: 'Gnomonic projection in Declination' },
    { key: 'CRPIX1', val: '1024.5', comment: 'Reference pixel X' },
    { key: 'CRPIX2', val: '1024.5', comment: 'Reference pixel Y' },
    { key: 'CRVAL1', val: '67.17540', comment: 'Reference RA in deg' },
    { key: 'CRVAL2', val: '16.20230', comment: 'Reference Dec in deg' },
    { key: 'CDELT1', val: '-0.001722', comment: 'Pixel scale: ~6.2 arcsec / pixel' },
    { key: 'CDELT2', val: '0.001722', comment: 'Pixel scale: ~6.2 arcsec / pixel' },
    { key: 'DATE-OBS', val: "'2025-06-14T18:42:11.204'", comment: 'Start UTC timestamp of exposure' },
    { key: 'ORIGIN', val: "'NASA / IPAC / Caltech'", comment: 'Infrared Processing and Analysis Center' }
  ]
}
