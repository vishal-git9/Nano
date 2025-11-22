export interface StyleOption {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    promptModifier: string;
}

export interface GeneratedImage {
    id: string;
    url: string;
    viewpoint: string;
    isLoading: boolean;
}

export interface Viewpoint {
    id: string;
    name: string;
}

export const VIEWPOINTS: Viewpoint[] = [
    { id: 'front', name: 'Front View' },
    { id: 'side', name: 'Side Profile' },
    { id: 'three_quarter', name: '3/4 Angle' },
    { id: 'overhead', name: 'Overhead Shot' },
    { id: 'low_angle', name: 'Low Angle' },
    { id: 'closeup', name: 'Close-up' },
    { id: 'action', name: 'Action Shot' },
    { id: 'candid', name: 'Candid Moment' },
];

export const STYLES: StyleOption[] = [
    {
        id: 'comic',
        name: 'Comic Book',
        description: 'Bold lines and vibrant colors',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCItwNViilLgClMK8lZIvijlCaeH4YeOGIltm33IN-MYlh1kM-8C0nqxADcEI9vueXVoALKur_W_4wd7mc0arwROsyYQZI3O3OjC-ZT-4nRPKPC3x79za7V-RtEt-8U5_2ayIGt-8WdlWq5_5Nqe4ETL_ktIU7RqGTWswVpbxWc3VcdGq1M3tLwVTCFIgDhGNSHbf8hTwVEDcXpmj656pD2o2r9QsRwU-xzDg0RDQQMioYLZ1Et6IwVR_bhe81H7DUpJUK-eJDQvX0',
        promptModifier: 'in a bold comic book style with thick outlines and vibrant flat colors',
    },
    {
        id: 'cyberpunk',
        name: 'Cyberpunk',
        description: 'Neon lights and futuristic vibes',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1S9UjG57-UxPY1MKfSVrUhpGoC1mIUFD6gK2g1aTaKbWXTjtUg5OyulTtIJoQydvBa1NlNTHp8ESMj_fpxkX6ZQgaMvSYHHlqmO7u_S6F8_Hujikz10x-hIYDXz7u2tysVbboDo49dxwcgf1mM6Nbguy8Vdoz2F1cBs2ApBwsO1RKdDWj0-i4JaQfBTBKS03wHC-30Zk7O1EaasvYpoyf5tTz9_jpIkTW5iNNZdu9YkWaspjoDclsp8gSMs_oFyo1QXZSaZjazOo',
        promptModifier: 'in a futuristic cyberpunk style with neon lighting, high contrast, and tech elements',
    },
    {
        id: 'oil',
        name: 'Oil Painting',
        description: 'Classic texture and brushstrokes',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCy-KRdebud2XIZ4rGQxLgzJ-TL0n1zPw4_cMfeuTklHsjGum7_Vb-BCgqL2b8B68Y_g1mUkDYBhi-TLFqljidSXfSl1icMVNIPoIuFPP4XyQCF3dexYUw1TKST4CF5MzPibc4kMC2t7JTAFxDoqS813r0zJDNgpMWlU90MLNbMd5wl5SqWahgYFFO0CRlsuxXLTzgC4abqKSOH-XlAmvsHX8wo83830FKHw05_crWYF2o7mFXJft2hi7M2rLe_LbtVK93or27p7gU',
        promptModifier: 'as a classical oil painting with visible brushstrokes and dramatic lighting',
    },
    {
        id: 'vintage',
        name: 'Vintage Film',
        description: 'Noir atmosphere and grain',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBmGHMledCIUnA4lvgMgTHqlmXKSyt8lD0AEd7cad4rdnB_ztJqCPDM5HfS6fYR8jTloPN37inH5wWCC4cxVHq0MR64iVQuPSf83GpQls1e48gX7JhA13mCiL1Dp43qAjAJzW1Rx58aroHn7l-yrY_umdA8-TdqPFKvt5jBEuPeCydnxsBgb97LYztcJiGQnnEyN61g8PwqEhmZ9C_2sX3_2zFftyJcQvZCdBaiaAtEpG_lWmj6DePmpxh_MgUGTQbqxX4GOiCyOc',
        promptModifier: 'in a vintage film noir style, black and white photography with film grain',
    },
    {
        id: 'anime',
        name: 'Anime',
        description: 'Japanese animation style',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDl4WvhbB-sqfsMK9-dtC4FBeNvwXrr7VC_Tq4AJhIJPY4i2HsgRnPlFEsfjQdVqZAk_V45t4P2DD3GMbYK7-DsxBqAUXamnWCaBpsaEZvUKxOR4t5OacxvvJdgzbiptQWDgAEtLTZMYXcuSNOSmHkA5AlYYiaUQCAizvg1UY2VtU2qoC1YkPNs_QGSS8x2T1Q6XsRF2VCf-F_CTAWBgap0amNLGrgYtc1nMgge9JEZlNQj0GdEhbc4f6c5rQNZTa9ZDPu0Zdeq8zQ',
        promptModifier: 'in a high-quality anime style with clean lines and cel shading',
    },
    {
        id: 'pixel',
        name: '8-bit Pixel',
        description: 'Retro gaming aesthetic',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpwnPKtnG7VJti2kmLoFpnxElcZcL_KQAbF-EM8yAGvVgvx2JtFiBjjDpTanH6u6Xbmfzrg2mTepiWOq6Y9dy7afQZUksBS6aQgVBWcsS33hMUZ6-Bh_mPIb1S4Lhnilmi5_OPAC4quz2CINMuweBh07afeFqOywjtXBqWAKVW_3GjXyuPJxbvaRH24Nkmu-NkqKPoq91yW_yEQHUwWAp9Of9ZbXFSIE03bscrh9n7RCJKNYAkZeWdifaecsKyNxmAj5L2spNVPCc',
        promptModifier: 'as 8-bit pixel art, retro game style',
    },
    {
        id: 'scifi',
        name: 'Sci-Fi Avatar',
        description: 'Futuristic robotic elements',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDoygZxngj4X_MUxfDnDIAsj61H180lzK59lukgWxBg30ZJCtmbsBfyJxZEb6Q71S9E0S0KAM3nW8JiX5DkIlvtJ2p-BZ768nL3DzcIt82zuln3yNge2ms2N9mQ4xatcywj9uc2YXV3TTJaARX0453PMBwVLo77molvRArs6H5ySavspyGaYpZK0LcMvIgyfyIl_LH781GYLn34CFRzTfDk3w2cPDlLgATE7fKvHhwM2b1vNxJew6hZbtqcDs8A_wTmRoaP-vGwIis',
        promptModifier: 'as a futuristic sci-fi avatar with robotic enhancements and glowing interface elements',
    },
    {
        id: 'cartoon',
        name: 'Cartoon',
        description: 'Friendly 3D character',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALuVSZCEK3SOTdXp6F65dah_AV2gKwa_5XwFuFRk55ik9bXK2w0Mv3hXPgLJceO7khtIoWdoL8QNTjVYsEAV-KpSgQQFqvSE30kzUeyYSAP-3htTNfUz-Qx-9cydkCV_SNNG230b4xZNfLb9iMHjnhIfLkGxSq_ZLuY7j5O15I_cZ1T7Dpr8CrBUgf2Ok2cRdECGj7YKPbdHkNY9zvqmUWZOtbW3TtcMr5dbsfAmRW6jBmnufcm2TPY3GTaWeHe7X1ZDNdgfUpJ-c',
        promptModifier: 'as a cute 3D cartoon character, pixar style rendering',
    },
];