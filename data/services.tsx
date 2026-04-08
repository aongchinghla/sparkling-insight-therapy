import React from 'react';
import { Activity, MessageCircle, Brain, Dumbbell, School, Users, UserPlus, LucideIcon } from 'lucide-react';

export interface Service {
  slug: string;
  name: string;
  icon: LucideIcon;
  desc: string;
  color: string;
  fullDescription: string;
  focusAreas: string[];
  benefits: string[];
  centered?: boolean;
}

export const services: Service[] = [
  {
    slug: 'occupational-therapy',
    name: 'Occupational Therapy (OT)',
    icon: Activity,
    desc: 'Developing fine motor skills and daily living independence.',
    color: 'bg-blue-50 text-blue-600',
    fullDescription: `Occupational Therapy (OT) supports children and individuals in developing the skills needed for everyday life. For children, this includes play, learning, social interaction, and self-care activities that build independence and confidence.

At Sparkling Insight Therapy Point, we provide individualized, evidence-based therapy tailored to each person's strengths and needs. Our therapists create supportive, sensory-informed environments that help clients feel regulated, safe, and ready to engage in meaningful activities.

We support a wide range of developmental areas, including fine and gross motor skills, sensory processing, emotional regulation, attention, social participation, school readiness, and daily living skills such as dressing, feeding, and personal hygiene. Therapy sessions are designed to be functional, engaging, and aligned with each child's goals.`,
    focusAreas: [
      'Sensory Integration Therapy',
      'Fine Motor Skills Development',
      'Handwriting Improvement',
      'Daily Living Skills Training',
      'Visual Perceptual Skills',
      'Emotional Regulation Strategies'
    ],
    benefits: [
      'Improved independence in daily activities',
      'Enhanced confidence and self-esteem',
      'Better social interaction and communication',
      'Stronger physical foundation for growth',
      'Increased participation in school and play'
    ]
  },
  {
    slug: 'speech-therapy',
    name: 'Speech & Language Therapy (SLT)',
    icon: MessageCircle,
    desc: 'Improving communication, articulation, and social skills.',
    color: 'bg-green-50 text-green-600',
    fullDescription: `At Sparkling Center, we understand that every child communicates in their own way and at their own pace. Our pediatric speech-language therapists (SLTs) provide individualized, evidence-based therapy designed to help children develop essential communication, language, and feeding skills. We focus on empowering children to express themselves, build meaningful relationships, and participate confidently in everyday life.

Speech therapy is about much more than teaching children to talk. It supports the development of verbal and nonverbal communication, social skills, early literacy, and functional day-to-day communication. For children with feeding or swallowing challenges, our therapists provide targeted support to improve safety, efficiency, and enjoyment during meals.`,
    focusAreas: [
      'Articulation & Phonology',
      'Expressive & Receptive Language',
      'Social Communication (Pragmatics)',
      'Fluency (Stuttering) Management',
      'Feeding & Swallowing Therapy',
      'Augmentative & Alternative Communication (AAC)'
    ],
    benefits: [
      'Clearer speech and improved articulation',
      'Enhanced ability to express thoughts and needs',
      'Better understanding of language and instructions',
      'Improved social skills and peer interactions',
      'Safe and enjoyable mealtime experiences'
    ]
  },
  {
    slug: 'aba-therapy',
    name: 'ABA Therapy',
    icon: Brain,
    desc: 'Behavioral interventions tailored for neurodivergent children.',
    color: 'bg-purple-50 text-purple-600',
    fullDescription: `At Sparkling, our Applied Behavior Analysis (ABA) therapy services are designed to help children develop meaningful skills, increase independence, and reduce behaviors that interfere with learning and daily life. We provide structured, evidence-based programs delivered in a supportive and engaging environment where children can grow with confidence.

ABA is a scientific, developmentally focused approach to learning and behavior. It works by understanding how behavior is influenced by the environment and using positive reinforcement to encourage helpful skills. Through ABA, complex skills are broken down into smaller, manageable steps.`,
    focusAreas: [
      'Behavior Management & Reduction',
      'Skill Acquisition Programs',
      'Social Skills Training',
      'Functional Communication Training',
      'Parent & Caregiver Training',
      'School Readiness Skills'
    ],
    benefits: [
      'Reduction in challenging behaviors',
      'Increased independence in daily routines',
      'Improved focus, attention, and memory',
      'Better social interaction and play skills',
      'Consistent progress through data-driven strategies'
    ]
  },
  {
    slug: 'physiotherapy',
    name: 'Physiotherapy',
    icon: Dumbbell,
    desc: 'Enhancing physical strength, balance, and coordination.',
    color: 'bg-orange-50 text-orange-600',
    fullDescription: `At our therapy center, Physiotherapy services are designed to support both children and adults in improving movement, strength, balance, and overall physical function. We provide individualized, evidence-based treatment plans focused on restoring mobility, preventing further complications, and enhancing independence in daily life.

Our pediatric physiotherapy program supports infants, toddlers, and children who experience delays or challenges in physical development. Therapy focuses on building strong foundational movement skills while supporting natural developmental milestones.`,
    focusAreas: [
      'Gross Motor Skill Development',
      'Strength & Endurance Training',
      'Balance & Coordination Exercises',
      'Gait Training & Mobility Support',
      'Postural Correction',
      'Neurodevelopmental Therapy'
    ],
    benefits: [
      'Improved mobility and range of motion',
      'Increased physical strength and endurance',
      'Better balance and coordination',
      'Correction of postural alignment',
      'Enhanced confidence in physical activities'
    ]
  },
  {
    slug: 'school-readiness',
    name: 'School Readiness',
    icon: School,
    desc: 'Preparing children for successful transition to mainstream schools.',
    color: 'bg-red-50 text-red-600',
    centered: true,
    fullDescription: `At Sparkling Insight Therapy Point, we are dedicated to supporting neurodiverse children so they can thrive academically, socially, and emotionally. Our ABA-based School Readiness Program is specifically designed to prepare children for successful participation in mainstream educational settings.

Our classrooms are thoughtfully designed to create a play-based, therapeutic learning environment grounded in the principles of Applied Behavior Analysis (ABA). Every space is intentionally structured to encourage exploration, creativity, and engagement while maintaining predictability and routine.`,
    focusAreas: [
      'Classroom Routine Adaptation',
      'Group Participation Skills',
      'Following Instructions',
      'Early Academic Concepts',
      'Social Interaction with Peers',
      'Independent Task Completion'
    ],
    benefits: [
      'Smoother transition to mainstream school',
      'Improved ability to follow classroom rules',
      'Enhanced social skills with peers and teachers',
      'Increased confidence in academic settings',
      'Reduced anxiety related to school environments'
    ]
  },
  {
    slug: 'group-therapy',
    name: 'Group Therapy',
    icon: Users,
    desc: 'Building social skills in a safe, structured environment.',
    color: 'bg-teal-50 text-teal-600',
    centered: true,
    fullDescription: `At Sparkling Insight Therapy Point, we understand that many children with learning, developmental, or motor delays may also face challenges in developing the social skills needed to form and maintain meaningful relationships. To support this critical area of development, we offer specialized group therapy programs designed to help children and adolescents grow socially, emotionally, and personally in a safe and structured environment.

Our signature social skills group provides children with a dynamic and engaging space to practice social interaction, communication, and self-regulation. This program is ideal for children who have progressed through individual therapy and are ready to apply their skills in a peer setting.`,
    focusAreas: [
      'Social Interaction & Play',
      'Emotional Regulation',
      'Cooperative Group Activities',
      'Perspective Taking',
      'Communication in Groups',
      'Conflict Resolution Skills'
    ],
    benefits: [
      'Improved ability to make and keep friends',
      'Better understanding of social cues',
      'Enhanced emotional control in group settings',
      'Increased confidence in social situations',
      'Supportive peer environment for growth'
    ]
  },
  {
    slug: 'counseling-services',
    name: 'Counseling Services',
    icon: UserPlus,
    desc: 'Guidance and emotional support for families and caregivers.',
    color: 'bg-indigo-50 text-indigo-600',
    centered: true,
    fullDescription: `At Sparkling Insight Therapy Point, we recognize that supporting a child's development goes hand-in-hand with supporting their family. Our counseling services are designed to provide guidance, emotional support, and collaborative coaching for caregivers, empowering them to understand and meet their child's unique needs.

We work with families to build confidence, strengthen connections, and navigate the challenges that can arise when caring for a child with developmental, sensory, or communication differences. By understanding a child's sensory needs, communication style, and individual strengths, caregivers gain practical strategies to create a supportive and nurturing home environment.`,
    focusAreas: [
      'Parent & Caregiver Coaching',
      'Emotional Support & Counseling',
      'Stress Management Strategies',
      'Family Dynamics Support',
      'Understanding Developmental Needs',
      'Building Resilience'
    ],
    benefits: [
      'Reduced caregiver stress and anxiety',
      'Improved family communication and bonding',
      'Better understanding of child’s needs',
      'Practical strategies for home support',
      'Empowered and confident parenting'
    ]
  }
];
