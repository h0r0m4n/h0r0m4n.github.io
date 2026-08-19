---
title: Virtual Reality
description: Developed a browser-based Virtual Reality experience accessible on multiple devices, enhancing user immersion.
client: Aeon
css:
  primary: '#fff'
  secondary: '#EB18D6'
  tertiary: '#FFE800'
  neutral1: 'rgba(255, 255, 255, 0.5)'
  neutral2: 'rgba(255, 255, 255, 0.25)'
  neutral3: 'rgba(255, 255, 255, 0.12)'
  neutral4: 'rgba(255, 255, 255, 0.06)'
  thumbnailHover: 'rgba(255, 255, 255, 0.12)'
  colorBackground: '#262326'
roles:
  - 3D Modelling
  - Interaction Design
  - Web Development
platform: VR
date: 2016-06-30
finished: true
thumbnail: src/static/work/aeon-vr.jpg
thumbnailRatio: 1-1
---

## Problem Definition & Discovery

The primary problem that was identified was that existing VR experiences were often limited to high-end VR headsets and computers. This meant that only a small number of people could experience the full potential of VR. Additionally, many existing VR experiences were not optimized for mobile devices, which resulted in poor performance and a sub-par user experience.

To address this problem, the goal was to create a VR experience that could be enjoyed by users on a variety of devices, from desktops and laptops to tablets and smartphones. This required careful consideration of the hardware limitations of each device and the use of techniques to optimize the performance of the experience.

## My Approach to Resolving the Problem

As the lead designer on this project, I recognized the importance of creating a visually stunning and engaging experience. This involved using a variety of techniques, including 3D modeling, texturing, and lighting, to create a world that was both believable and immersive. I also focused on creating intuitive and user-friendly interactions that would allow players to navigate the environment.

## Challenges & Solutions

One of the primary challenges was creating a virtual reality experience that could be rendered smoothly and efficiently on a variety of devices. This required careful optimization of the code and the use of complex javascript API’s and libraries such as WebGL and three.js.

Another challenge was ensuring that the experience was accessible to a wide range of users. This involved designing the interface for touch devices and making sure that the experience was playable even with lower-end hardware.

To address these challenges, I implemented the following strategies:

- **Optimized Code**: I used a variety of techniques to optimize the code, such as minimizing the number of draw calls and using efficient rendering algorithms.
- **WebGL and three.js**: I used WebGL and three.js to create a high-performance virtual reality experience that could be rendered smoothly on a variety of devices.
- **Responsive Design**: I designed the interface to be responsive, so that it could adapt to different screen sizes and resolutions.
- **Accessibility**: I made sure that the experience was accessible to a wide range of devices by supporting different input methods and lower-end graphic chips.

### Visual Concepts

I decided that the visual parameters, such as colours and lights with low-range sections, were followed by the light parts, and warm colours followed the sections with cold colours. This has been linked to establishing a feeling of rhythm and creating a visual outline of each scene:

{% image "src/static/work/aeon-vr-1.png" "" "An overview of 2D color patterns of each area" %}
{% image "src/static/work/aeon-vr-2.png" "" "An overview of 3D color patterns of each area" %}

### Branding & Typography

The typography was important in this project as I had an important visual role in the experience. And was used in the creation of the brand itself.

{% image-big "src/static/work/aeon-vr-5.jpg" "" "" %}

### 3D Models & Rendering

All the geometric figures were designed in a Blender following a low-poly technique that can guarantee low-end devices' most excellent possible performance. However, I adopted procedural programming as well in order to generate some forms automatically, such as grass and clouds.

{% stats "3D objects handcrafted" "20+" "Procedural generated" "100+" "" "" "" %}

{% image "src/static/work/aeon-vr-perspective-sizes.jpg" "" "Mapping of sizes for the VR perspective experience." %}
{% image "src/static/work/aeon-vr-3.jpg" "" "The overview of entire VR map created on Blender." %}

### Development

[Aeon](http://aeon.horoman.com) was developed using methods and work processes, automating the workflow. The web app was built in the efficient world using Gulp.js which acted as executor of the pre-established commands necessary for development. The configuration of Gulp was customized ad-hoc and the use of the JavaScript language together with the logic of Node.js which is equipped with a tool called NPM that allowed to load, modify and modify the packages necessary for development by generating the file package.json containing information on each package used, in this way it was possible to make the development environment versatile. The use of Gulp.js allowed the use of commands from the terminal thanks to which he began to listen and execute tasks such as compiling CSS files using SASS, concatenating and compressing JavaScript files, Jade compilation which spared not the writing the HTML code.

{% video "aeon-vr-development" "autoplay" "" %}

It was possible to further extend the automation of the workflow of Gulp thanks to some plugins such as BrowserSync which allowed the simultaneous development in various browsers on the desktop, tablet and smartphone; Webpack has permission to manage JavaScript modules. The program approach started with planning, writing the code and finally testing. Most of the prototyping was done by writing code based on the modulation and arrangement of objects for easy identification.

{% image "src/static/work/aeon-vr-4.jpg" "" "" %}

The complex development of [Aeon](http://aeon.horoman.com) had the need to use a versioning system such as Git through the GitHub service which made it possible to store all the changes made to one or more files in order to be able to return to a previous state at any time. The GitHub service has permission to conduct multiple experiments and yet keep a "clean" version of the project, modify changes as needed, and in some circumstances, it was possible to rewrite the project's history in a release form. In this way, every step of the design process was documented.

{% image "src/static/work/aeon-vr-map.jpg" "" "Map" %}

Text data had a size saving advantage of over 75%, thanks to HTML compression in conjunction with GZIP. The application interface uses the vector format to ensure sharpness regardless of the pixel density of the devices. SVG symbols were used to reduce HTTP requests and uploads.

Real-time 3D rendering was possible using WebGL technology along with three. Js which natively allowed the creation of scenes - where all objects, cameras and lights are placed, objects - geometries and materials rooms - single and multiple rooms necessary for virtual reality by simulating stereoscopic vision and lights. The three.js library has permission to have excellent consistency by speeding up the working process in the interactions.

## Timeline and Results

The development of [Aeon VR](https://aeon.horoman.com) took approximately six months. The project was completed on time and within budget, and the experience was well-received by users. It works on specific types of browsers such as Chromium, Chrome Canary, Firefox Nightly, Safari (iOS), Chrome Dev (Android). Such browsers offer better WebGL support, making the best use of GPU’s.

{% image-big "src/static/work/aeon-vr-6.png" "" "" %}

Thanks to the set of technologies such as WebVR API and three.js and the automated workflow it was possible to create a virtual reality experience not only working on computers but also on tablet and mobile devices with medium-high power graphics chips.

{% image-big "src/static/work/aeon-vr-7.png" "" "" %}

{% video-large "aeon-vr-1" "autoplay" "" %}

## Key Learnings

Throughout the Aeon VR project, I gained valuable insights into the challenges and opportunities of creating virtual reality experiences. I learned that it is essential to focus on creating a visually stunning and immersive experience that is also accessible to a wide range of users. I also learned that careful optimization of the code is crucial for ensuring that virtual reality experiences run smoothly on a variety of devices.

## Overall Impact

Aeon VR has received positive feedback from users and has been featured in a number of publications. It has also been used by IED an educational institution to provide virtual reality training and experiences.

The Aeon VR project has demonstrated the potential of virtual reality to create engaging and immersive experiences. It has also shown that it is possible to create virtual reality experiences that can be enjoyed on a variety of devices.

{% stats "Pageviews on first month" "10.000+" "Minimum frame rate" "45FPS" "Total polygons in scene" "60.000+" "" %}
