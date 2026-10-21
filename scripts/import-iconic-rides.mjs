import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

// Curated local artwork imports. Original collection files remain unchanged.
const choices = [
  {
    source:
      'crea_immagine_stile_hot_wheels_collezione_nft_modello_ferrari_f40_1987_insane_details_sfondo_pop_ar_c11cbu9ndopqjtjs40zs_0.png',
    image: 'iconic-rides-ferrari-f40.webp',
  },
  {
    source:
      'crea_immagine_stile_hot_wheels_collezione_nft_modello_bugatti_type_35_insane_details_sfondo_pop_art_q55oss2p7akxzswkmkae_0.png',
    image: 'iconic-rides-bugatti-type-35.webp',
  },
  {
    source:
      'crea_immagine_stile_hot_wheels_collezione_nft_cadillac_series_62_convertible_pink_1959_insane_detai_fk6bag2tefnuw0rh3mff_0.jpg',
    image: 'iconic-rides-cadillac-series-62.webp',
  },
  {
    source:
      'crea_immagine_stile_hot_wheels_collezione_nft_modello_jaguar_e-type_1961_insane_details_sfondo_pop__p2vjy07kidicg3v23ua0_0.png',
    image: 'iconic-rides-jaguar-e-type.webp',
  },
  {
    source:
      'crea_immagine_stile_hot_wheels_collezione_nft_modello_ford_mustang_1964_insane_details_sfondo_pop_a_rpa4ofr89szzj27885et_0.png',
    image: 'iconic-rides-ford-mustang.webp',
  },
  {
    source:
      'crea_immagine_stile_hot_wheels_collezione_nft_modello_fiat_500_insane_details_sfondo_pop_art_vivace_94urhzvic2jygk5hgpza_0.png',
    image: 'iconic-rides-fiat-500.webp',
  },
  {
    source:
      'crea_immagine_stile_hot_wheels_collezione_nft_modello_lamborghini_countach_1974_insane_details_sfon_zqjze46x7ahein8idsup_0.png',
    image: 'iconic-rides-lamborghini-countach.webp',
  },
  {
    source:
      'crea_immagine_stile_hot_wheels_collezione_nft_modello_bmw_m3_1986_insane_details_sfondo_pop_art_viv_4lagehl57sscv0od8lnu_0.png',
    image: 'iconic-rides-bmw-m3.webp',
  },
  {
    source:
      'crea_immagine_stile_hot_wheels_collezione_nft_modello_porshe_911_insane_details_sfondo_pop_art_viva_iybnxcqc4bnjvrd3hcik_0.png',
    image: 'iconic-rides-porsche-911.webp',
  },
  {
    source:
      'crea_immagine_stile_hot_wheels_collezione_nft_modello_nissan_skyline_gt-r_2002_insane_details_sfond_av4iqh08dy1fi3hpv1si_0.png',
    image: 'iconic-rides-nissan-skyline.webp',
  },
  {
    source:
      'crea_immagine_stile_hot_wheels_collezione_nft_modello_mclaren_f1_1992_insane_details_sfondo_pop_art_ixp50715jb8bau51up8t_0.png',
    image: 'iconic-rides-mclaren-f1.webp',
  },
  {
    source:
      'crea_immagine_stile_hot_wheels_collezione_nft_modello_porsche_taycan_2019_insane_details_sfondo_pop_l9g1n7f1p5djnyzrwe5x_0.png',
    image: 'iconic-rides-porsche-taycan.webp',
  },
];
const sourceRoot = path.resolve('Documenti/Macchine');
await fs.mkdir('public/media', { recursive: true });
const media = JSON.parse(await fs.readFile('src/data/media.json', 'utf8'));
for (const choice of choices) {
  const input = path.resolve(sourceRoot, choice.source);
  if (!input.startsWith(sourceRoot + path.sep)) throw Error('Invalid source artwork path');
  const output = '/media/' + choice.image;
  await sharp(input)
    .rotate()
    .resize({ width: 1400, withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile('public' + output);
  const info = await sharp('public' + output).metadata();
  media[choice.image] = { src: output, poster: output, width: info.width, height: info.height };
}
await fs.writeFile('src/data/media.json', JSON.stringify(media));
const galleries = JSON.parse(await fs.readFile('src/data/galleries.json', 'utf8'));
galleries['/iconic-rides-legends/'] = choices.map((c) => c.image);
await fs.writeFile('src/data/galleries.json', JSON.stringify(galleries));
console.log(
  'Imported',
  choices.length,
  'Iconic Rides Legends artworks as optimized local WebP images.',
);
