
import React from 'react';
import { Period, PeriodInfo } from './types';

export const PERIODS: Record<Period, PeriodInfo> = {
  [Period.DIVAN]: {
    id: Period.DIVAN,
    title: 'Divan Edebiyatı',
    era: '13. - 19. Yüzyıl',
    description: 'Sarayı çevreleyen, Arap ve Fars edebiyatı etkisindeki yüksek zümre edebiyatı.',
    color: 'bg-amber-100 border-amber-500',
    accent: 'amber',
    keyConcepts: ['Aruz Ölçüsü', 'Mazmun', 'Gazel', 'Kaside', 'Mesnevi'],
    authors: ['Fuzuli', 'Baki', 'Nedim', 'Şeyh Galip'],
    works: ['Leyla ile Mecnun', 'Hüsn ü Aşk', 'Siham-ı Kaza'],
    mission: 'Mazmunları çöz ve Aruz veznini tamamla.'
  },
  [Period.TANZIMAT]: {
    id: Period.TANZIMAT,
    title: 'Tanzimat Edebiyatı',
    era: '1860 - 1896',
    description: 'Batılılaşma etkisinde, hak, adalet ve hürriyet kavramlarının girişi.',
    color: 'bg-red-50 border-red-500',
    accent: 'red',
    keyConcepts: ['Hürriyet', 'Hak', 'Adalet', 'Gazete', 'Tiyatro'],
    authors: ['Namık Kemal', 'Şinasi', 'Ziya Paşa', 'Recaizade Mahmut Ekrem'],
    works: ['Vatan Yahut Silistre', 'Şair Evlenmesi', 'Araba Sevdası'],
    mission: 'Gazete manşeti düzenle ve özgürlük davasına katıl.'
  },
  [Period.SERVETIFUNUN]: {
    id: Period.SERVETIFUNUN,
    title: 'Servet-i Fünun',
    era: '1896 - 1901',
    description: 'Fenlerin Hazinesi, ağır dil ve bireysel hüzün yüklü sanat anlayışı.',
    color: 'bg-purple-50 border-purple-500',
    accent: 'purple',
    keyConcepts: ['Sanat için Sanat', 'Mai ve Siyah', 'Aşk-ı Memnu', 'Melankoli'],
    authors: ['Halit Ziya Uşaklıgil', 'Tevfik Fikret', 'Cenap Şahabettin'],
    works: ['Eylül', 'Rübab-ı Şikeste', 'Kırık Hayatlar'],
    mission: 'Modern roman parçalarını birleştir.'
  },
  [Period.MILLI]: {
    id: Period.MILLI,
    title: 'Milli Edebiyat',
    era: '1911 - 1923',
    description: 'Yeni Lisan, halka yöneliş ve milli değerlerin keşfi.',
    color: 'bg-emerald-50 border-emerald-500',
    accent: 'emerald',
    keyConcepts: ['Halka Doğru', 'Hece Ölçüsü', 'Sade Türkçe', 'Anadolu'],
    authors: ['Ömer Seyfettin', 'Ziya Gökalp', 'Halide Edip Adıvar', 'Yakup Kadri Karaosmanoğlu'],
    works: ['Yaban', 'Ateşten Gömlek', 'Dokuzuncu Hariciye Koğuşu'],
    mission: 'Hece ölçüsüyle milli bir marş yaz.'
  },
  [Period.CUMHURIYET]: {
    id: Period.CUMHURIYET,
    title: 'Cumhuriyet Dönemi',
    era: '1923 - Günümüz',
    description: 'Yenilikçi akımlar, Garip, İkinci Yeni ve toplumcu gerçekçilik.',
    color: 'bg-orange-50 border-orange-500',
    accent: 'orange',
    keyConcepts: ['Serbest Müstezat', 'Garip Akımı', 'İkinci Yeni', 'Toplumcu Gerçekçilik'],
    authors: ['Orhan Veli Kanık', 'Nazım Hikmet', 'Yaşar Kemal', 'Ahmet Hamdi Tanpınar'],
    works: ['Memleketimden İnsan Manzaraları', 'İnce Memed', 'Huzur'],
    mission: 'Modern edebiyatın karmaşasında yerini bul.'
  }
};
