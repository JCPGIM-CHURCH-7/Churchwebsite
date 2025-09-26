"use client"
import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Heart, Search, Star, Crown } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"

// Move praises data outside the component
export const praises = [
  "Give thanks to God for He is the only one God for His grace continues forever and ever",
  "Give thanks to God for He is the only True God for His grace continues forever and ever",
  "Give thanks to God for He is the Most High God for His grace continues forever and ever",
  "Give thanks to God for He is the King of Kings for His grace continues forever and ever",
  "Give thanks to God for He is the Lord of Lords for His grace continues forever and ever",
  "Give thanks to God for He is who reigns forever and ever for His grace continues forever and ever",
  "Give thanks to God for He is the everlasting God for His grace continues forever and ever",
  "Give thanks to God for He is the Eternal God. for His grace continues forever and ever",
  "Give thanks to God for He is the God the Father for His grace continues forever and ever",
  "Give thanks to God for He is my Heavenly Father for His grace continues forever and ever",
  "Give thanks to God for is anything too hard for Him for His grace continues forever and ever",
  "Give thanks to God for nothing is impossible to Him for His grace continues forever and ever",
  "Give thanks to God for He has forgiven all my sins for His grace continues forever and ever",
  "Give thanks to God for He has forgiven all my transgressions for His grace continues forever and ever",
  "Give thanks to God for He has washed me of all my iniquity for His grace continues forever and ever",
  "Give thanks to God for His name is great for His grace continues forever and ever",
  "Give thanks to God for He is greatly to be praised for His grace continues forever and ever",
  "Give thanks to God for He is going to comeback soon for His grace continues forever and ever",
  "Give thanks to God for He is the Jehovah Emmanuel for His grace continues forever and ever",
  "Give thanks to God for He is my Savior for His grace continues forever and ever",
  "Give thanks to God for He is my protector for His grace continues forever and ever",
  "Give thanks to God for He is my shield for His grace continues forever and ever",
  "Give thanks to God for He is my grace for His grace continues forever and ever",
  "Give thanks to God for He is my holiness for His grace continues forever and ever",
  "Give thanks to God for He has shown all His goodness to me for His grace continues forever and ever",
  "Give thanks to God for He made my sins as white as snow for His grace continues forever and ever",
  "Give thanks to God for He is my redeemer for His grace continues forever and ever",
  "Give thanks to God for He is my life for His grace continues forever and ever",
  "Give thanks to God for He is the God who will never leave me nor forsake me for His grace continues forever and ever",
  "Give thanks to God for He is the Alpha and Omega for His grace continues forever and ever",
  "Give thanks to God for He is the First and the Last for His grace continues forever and ever",
  "Give thanks to God for He is the beginning and the end for His grace continues forever and ever",
  "Give thanks to God for He is the Jehovah Jireh my divine provider for His grace continues forever and ever",
  "Give thanks to God for He is the Jehovah Shammah, I’m in His divine presence for His grace continues forever and ever",
  "Give thanks to God for He is the Jehovah Nissi, who fights all my battles for His grace continues forever and ever",
  "Give thanks to God for He is the Jehovah Rapha, my divine healer for His grace continues forever and ever",
  "Give thanks to God for He is my Lord God the good Shepherd for His grace continues forever and ever",
  "Give thanks to God for He is the God who is Al-Mighty for His grace continues forever and ever",
  "Give thanks to God for He with His outstretched arm will do mighty and great things for His grace continues forever and ever",
  "Give thanks to God for He is the God of Miracles for His grace continues forever and ever",
  "Give thanks to God for He is the God of great wonders for His grace continues forever and ever",
  "Give thanks to God for He is the God of Abraham, Isaac and Jacob for His grace continues forever and ever",
  "Give thanks to God for He is the Living God for His grace continues forever and ever",
  "Give thanks to God for He is the Merciful God for His grace continues forever and ever",
  "Give thanks to God for He is the God who answers us when we call for His grace continues forever and ever",
  "Give thanks to God for He is the God who shows mighty and great things which we do not know for His grace continues forever and ever",
  "Give thanks to God for He is who gives me more than we ask or think for His grace continues forever and ever",
  "Give thanks to God for He is the Son of God for His grace continues forever and ever",
  "Give thanks to God for He is the Ha-Elyon, the Supreme God for His grace continues forever and ever",
  "Give thanks to God for He is the El-Shaddai, the Almighty God for His grace continues forever and ever",
  "Give thanks to God for He is the Spirit for His grace continues forever and ever",
  "Give thanks to God for He is Holy Spirit of God for His grace continues forever and ever",
  "Give thanks to God for He is who deserve glory and honor for His grace continues forever and ever",
  "Give thanks to God for His faithfulness is great for His grace continues forever and ever",
  "Give thanks to God for He is the Creator for His grace continues forever and ever",
  "Give thanks to God for He has created the Heavens and the Earth for His grace continues forever and ever",
  "Give thanks to God for He is my redeemer who lives for His grace continues forever and ever",
  "Give thanks to God for He is the resurrection and life for His grace continues forever and ever",
  "Give thanks to God for He is the way, truth and the life for His grace continues forever and ever",
  "Give thanks to God for He is the bread of my life for His grace continues forever and ever",
  "Give thanks to God for He is my refuge and my strength for His grace continues forever and ever",
  "Give thanks to God for He is my confidence in the times of trouble for His grace continues forever and ever",
  "Give thanks to God for He is my way maker for His grace continues forever and ever",
  "Give thanks to God for He is the door, my protector and safe-guards my life for His grace continues forever and ever",
  "Give thanks to God for He is the God who is the Word for His grace continues forever and ever",
  "Give thanks to God for He has dwelt among us in the form of flesh for His grace continues forever and ever",
  "Give thanks to God for He is the God who came into this world in the form of flesh for His grace continues forever and ever",
  "Give thanks to God for He is the God of all the living beings of the seas for His grace continues forever and ever",
  "Give thanks to God for He is the God of all the living beings on this earth for His grace continues forever and ever",
  "Give thanks to God for He is the God of both the small and the great for His grace continues forever and ever",
  "Give thanks to God for He is the God of both the rich and the poor for His grace continues forever and ever",
  "Give thanks to God for He is the God where every eye shall see and every knee shall bow down to Him for His grace continues forever and ever",
  "Give thanks to God for He is the God who is the Living Manna for His grace continues forever and ever",
  "Give thanks to God for He is the God of Tabernacle for His grace continues forever and ever",
  "Give thanks to God for He is the Most High Priest for His grace continues forever and ever",
  "Give thanks to God for He is the God whose love is eternal for His grace continues forever and ever",
  "Give thanks to God for He is the God who is invisible for His grace continues forever and ever",
  "Give thanks to God for He is the God who works everything in secret for His grace continues forever and ever",
  "Give thanks to God for He is the God who is mysterious God for His grace continues forever and ever",
  "Give thanks to God for He is the God who is the way to Heaven for His grace continues forever and ever",
  "Give thanks to God for He is the God who is the true light for His grace continues forever and ever",
  "Give thanks to God for He is the God of all Nations for His grace continues forever and ever",
  "Give thanks to God for He is the God where all Nations are as the drop to Him for His grace continues forever and ever",
  "Give thanks to God for He is the God of all praises for His grace continues forever and ever",
  "Give thanks to God for He is the God who is worthy to be praised day and night for His grace continues forever and ever",
  "Give thanks to God for He is the God who is to be praised from the sunrise to sunset for His grace continues forever and ever",
  "Give thanks to God for He is the God who was, who is and is to come for His grace continues forever and ever",
  "Give thanks to God for He is the God who lives forever and ever for His grace continues forever and ever",
  "Give thanks to God for He is the God of Living for His grace continues forever and ever",
  "Give thanks to God for He is the God who heals for His grace continues forever and ever",
  "Give thanks to God for He is the God who rises on me with healing wings for His grace continues forever and ever",
  "Give thanks to God for He is the God of all great and awesome things for His grace continues forever and ever",
  "Give thanks to God for He is the God whose will is prospered in my life for His grace continues forever and ever",
  "Give thanks to God for He is the God of all truth for His grace continues forever and ever",
  "Give thanks to God for He is the God who is true wine for His grace continues forever and ever",
  "Give thanks to God for He is the God to whom belong all the mysteries for His grace continues forever and ever",
  "Give thanks to God for He is the God who is the ruler for His grace continues forever and ever",
  "Give thanks to God for He is the God who is the King for His grace continues forever and ever",
  "Give thanks to God for He is the God who is the Prophet for His grace continues forever and ever",
  "Give thanks to God for He is the God who fulfills the promises for His grace continues forever and ever",
  "Give thanks to God for He is the God who abides in truth for His grace continues forever and ever",
  "Give thanks to God for He is the God who is trustworthy for His grace continues forever and ever",
  "Give thanks to God for He is the God who is the Cornerstone for His grace continues forever and ever",
  "Give thanks to God for He is the God who is my rereward and my shield for His grace continues forever and ever",
  "Give thanks to God for He is the God who is my portion and my inheritance for His grace continues forever and ever",
  "Give thanks to God for He is the God who is Sovereign for His grace continues forever and ever",
  "Give thanks to God for He is the God who is my sustainer for His grace continues forever and ever",
  "Give thanks to God for He is the God who gives the deliverance from the sin for His grace continues forever and ever",
  "Give thanks to God for He is the God who never forgets the poor for His grace continues forever and ever",
  "Give thanks to God for He is the God who is my head for His grace continues forever and ever",
  "Give thanks to God for He is the God who is the revealer of the insights and revelations for His grace continues forever and ever",
  "Give thanks to God for He is the God who is the way maker for His grace continues forever and ever",
  "Give thanks to God for He is the God who is generous for His grace continues forever and ever",
  "Give thanks to God for He is the God who is patient for His grace continues forever and ever",
  "Give thanks to God for He is the God who is my living hope for His grace continues forever and ever",
  "Give thanks to God for He is the God in whom I will trust at all times for His grace continues forever and ever",
  "Give thanks to God for He is the God who extends the peace like a river for His grace continues forever and ever",
  "Give thanks to God for He is the God who is my helper for His grace continues forever and ever",
  "Give thanks to God for He is the spring of the living waters for His grace continues forever and ever",
  "Give thanks to God for He is the God who hates sin for His grace continues forever and ever",
  "Give thanks to God for He is God to whom I thank Him for all things for His grace continues forever and ever",
  "Give thanks to God for He is the God to whom I offer my thanksgiving for His grace continues forever and ever",
  "Give thanks to God for He is the God who is my banner and the lifter of my head for His grace continues forever and ever",
  "Give thanks to God for He is the God who is my lot and my portion for His grace continues forever and ever",
  "Give thanks to God for He is the God who is enthroned forever and ever for His grace continues forever and ever",
  "Give thanks to God for He is God whose throne is established forever and ever Amen for His grace continues forever and ever",
  "Give thanks to God for He is the God who is the Lord God of hosts for His grace continues forever and ever",
  "Give thanks to God for He is the God who lifts up my banner for His grace continues forever and ever",
  "Give thanks to God for He is the God whose hand is on the throne to war with my enemies for His grace continues forever and ever",
  "Give thanks to God for He is the God who gave the waters from the rock for His grace continues forever and ever",
  "Give thanks to God for He is the God who feeds us with the finest of the wheat for His grace continues forever and ever",
  "Give thanks to God for He is the God who gives us the honey from the rock for His grace continues forever and ever",
  "Give thanks to God for He is God who will lead us to the promised land for His grace continues forever and ever",
  "Give thanks to God for He is God who gives the bread from the heavens for His grace continues forever and ever",
  "Give thanks to God for He is the God who said I am with you always till the end for His grace continues forever and ever",
  "Give thanks to God for He is the God whose name is above all names for His grace continues forever and ever",
  "Give thanks to God for He is the God whose blood is shed for many for His grace continues forever and ever",
  "Give thanks to God for He is the God who is the Lord of Sabbath for His grace continues forever and ever",
  "Give thanks to God for He is the God who returns in glory and power for His grace continues forever and ever",
  "Give thanks to God for He is the God who is of incorruptible seed for His grace continues forever and ever",
  "Give thanks to God for He is the God who accepts my plea for His grace continues forever and ever",
  "Give thanks to God for He is the God who knows who I am for His grace continues forever and ever",
  "Give thanks to God for He is the God who tried my heart and my mind for His grace continues forever and ever",
  "Give thanks to God for He is the God who saves the upright in heart for His grace continues forever and ever",
  "Give thanks to God for He is the God who will judge according to my integrity for His grace continues forever and ever",
  "Give thanks to God for He is the God who weighs my righteous acts for His grace continues forever and ever",
  "Give thanks to God for He is the God who is my voice of praise for His grace continues forever and ever",
  "Give thanks to God for He is the God of supernatural life for His grace continues forever and ever",
  "Give thanks to God for He is the God who performs miracles in my life for His grace continues forever and ever",
  "Give thanks to God for He is the God in whom I am immersed to death but will be raised to resurrection for His grace continues forever and ever",
  "Give thanks to God for He is the God in whose palms are my walls continually for His grace continues forever and ever",
  "Give thanks to God for He is the God who gives me glorious body for His grace continues forever and ever",
  "Give thanks to God for He is the God who breaks the iron gates wide open for His grace continues forever and ever",
  "Give thanks to God for He is the God whose heart and eyes shall remain forever from the place wherever I pray. for His grace continues forever and ever",
  "Give thanks to God for He is the God who says all my labor will never go in vain for His grace continues forever and ever",
  "Give thanks to God for He is the God who has anointed me to break every debt for His grace continues forever and ever",
  "Give thanks to God for He is the God who is of glorious splendor for His grace continues forever and ever",
  "Give thanks to God for He is the God whom I praise to the heights for His grace continues forever and ever",
  "Give thanks to God for He is the God who will hear me when I call upon Your Holy name sincerely for His grace continues forever and ever",
  "Give thanks to God for He is the God who saved me from the guilt of the eternal sin for His grace continues forever and ever",
  "Give thanks to God for He is the God who came to save the sinners but not the righteous for His grace continues forever and ever",
  "Give thanks to God for He is the God whose fame of majesty is above the heavens for His grace continues forever and ever",
  "Give thanks to God for He is God who is a faithful witness for His grace continues forever and ever",
  "Give thanks to God for He is who is worthy to open the seven seals for His grace continues forever and ever",
  "Give thanks to God for He is the God who is the anchor of my life for His grace continues forever and ever",
  "Give thanks to God for He is the God who gives me a new name and a new spirit for His grace continues forever and ever",
  "Give thanks to God for He is the God who shows the everlasting kindness to me for His grace continues forever and ever",
  "Give thanks to God for He is the God whose mercy endureth forever and ever for His grace continues forever and ever",
  "Give thanks to God for He is the God who shows new mercies every morning for His grace continues forever and ever",
  "Give thanks to God for He is the God who is Alpha and Omega for His grace continues forever and ever",
  "Give thanks to God for He is the God who is the eternal King for His grace continues forever and ever",
  "Give thanks to God for He is the God who remains among the Cherubbims for His grace continues forever and ever",
  "Give thanks to God for He is the God whose word is a double edged sword for His grace continues forever and ever",
  "Give thanks to God for He made the heavens skillfully for His grace continues forever and ever",
  "Give thanks to God for He spread out the earth and the waters for His grace continues forever and ever",
  "Give thanks to God for He is who made the great lights for His grace continues forever and ever",
  "Give thanks to God for He made the sun to rule the day for His grace continues forever and ever",
  "Give thanks to God for He made the moon and the stars to rule the night for His grace continues forever and ever",
  "Give thanks to God for He split the sea apart for His grace continues forever and ever",
  "Give thanks to God for He is God who led His people through the desert for His grace continues forever and ever",
  "Give thanks to God for He is the God who struck down the great kings for His grace continues forever and ever",
  "Give thanks to God for He is the God who slaughtered the powerful enemies for His grace continues forever and ever",
  "Give thanks to God for He is the God who gives the land as a heritage for His grace continues forever and ever",
  "Give thanks to God for He is the God who remembers whenever I am brought low for His grace continues forever and ever",
  "Give thanks to God for He is the God who rescues me from my enemies for His grace continues forever and ever",
  "Give thanks to God for He is the God who provides food for every living creature for His grace continues forever and ever",
  "Give thanks to God for He is the God of heaven for His grace continues forever and ever",
  "Give thanks to God for He is the God who is with me to rescue me for His grace continues forever and ever",
  "Give thanks to God for He is the God who will help me to know the wisdom in my inmost being for His grace continues forever and ever",
  "Give thanks to God for He is the God who will thoroughly wash me from all my guilt for His grace continues forever and ever",
  "Give thanks to God for He is the God who blots out all my transgressions for His grace continues forever and ever",
  "Give thanks to God for He is the God whose compassions fail not for His grace continues forever and ever",
  "Give thanks to God for He is the God who will never take out His Spirit away from me for His grace continues forever and ever",
  "Give thanks to God for He is the God who will restore my joy in the salvation for His grace continues forever and ever",
  "Give thanks to God for He is the God who will open my lips to praise Him for His grace continues forever and ever",
  "Give thanks to God for He is the God who will accept my sacrifices of broken heart for His grace continues forever and ever",
  "Give thanks to God for He is the God who in His good pleasure will make me to prosper for His grace continues forever and ever",
  "Give thanks to God for He is the God who will not abandon me because I seek You constantly for His grace continues forever and ever",
  "Give thanks to God for He is the God who will help me my unbelief for His grace continues forever and ever",
  "Give thanks to God for He is the God who can do anything for me If I believe for His grace continues forever and ever",
  "Give thanks to God for He is the God who will guard me against all harm for His grace continues forever and ever",
  "Give thanks to God for He is God who provides me His shade for His grace continues forever and ever",
  "Give thanks to God for He is the God who will teach me all His laws for His grace continues forever and ever",
  "Give thanks to God for He is the God whose hand is ready to help me for His grace continues forever and ever",
  "Give thanks to God for He is the God who is my delight for His grace continues forever and ever",
  "Give thanks to God for He is the God who is my stronghold when I am depressed for His grace continues forever and ever",
  "Give thanks to God for He is the God who hears the sound of my prayers for His grace continues forever and ever",
  "Give thanks to God for He is the God who saves me from all destruction for His grace continues forever and ever",
  "Give thanks to God for He is the God who will never forsakes me when I come to Him for His grace continues forever and ever",
  "Give thanks to God for He is the God who blesses me always with great faith for His grace continues forever and ever",
  "Give thanks to God for He is the God who will help me to move mountains honoring my faith for His grace continues forever and ever",
  "Give thanks to God for He is the God who will fulfill everything that I call anything even without form for His grace continues forever and ever",
  "Give thanks to God for He is the God who will move me to higher realms of the Spirit for His grace continues forever and ever",
  "Give thanks to God for He is the God who will increase my imaginations according to the Word of God for His grace continues forever and ever",
  "Give thanks to God for He is the God who adores me with His pure love for His grace continues forever and ever",
  "Give thanks to God for He is the God who is mindful of me for His grace continues forever and ever",
  "Give thanks to God for He is the God who covers me with his feathers under your powerful wings for His grace continues forever and ever",
  "Give thanks to God for He is the God who elevates me to four winds of heaven for His grace continues forever and ever",
  "Give thanks to God for He is the God who flourishes me for His grace continues forever and ever",
  "Give thanks to God for He is the God who will increase my greatness for His grace continues forever and ever",
  "Give thanks to God for He is the God who will show His compassions that fail not for His grace continues forever and ever",
  "Give thanks to God for He is the God who will bring me out with a great hope even after falling into a deep pit for His grace continues forever and ever",
  "Give thanks to God for He is the God who is my strength and power for His grace continues forever and ever",
  "Give thanks to God for He is the God who will help me to prevail over the God and over the man for His grace continues forever and ever",
  "Give thanks to God for He is God who will give me great favor in the sight of God as well as in the sight of men for His grace continues forever and ever",
  "Give thanks to God for He is the God who will supply all my needs according to His riches for His grace continues forever and ever",
  "Give thanks to God for He is the God who directs my footsteps for His grace continues forever and ever",
  "Give thanks to God for He is the God who will turn the dry and parched lands into the pools and valleys of water for His grace continues forever and ever",
  "Give thanks to God for He is the God who will turn my sufferings into testimonies for His grace continues forever and ever",
  "Give thanks to God for He is the God who will not tempt me more than I can bear for His grace continues forever and ever",
  "Give thanks to God for He is the God who has opened the doors that nobody can shut for His grace continues forever and ever",
  "Give thanks to God for He is the God who has given me the keys of the kingdom of heaven for His grace continues forever and ever",
  "Give thanks to God for He is the God who will restore in double measure for what the cankerworm, caterpillar and locust has destroyed for His grace continues forever and ever",
  "Give thanks to God for He is the God who will save me from the enemy which comes to destroy, kill and steal everything I have for His grace continues forever and ever",
  "Give thanks to God for He is the God who shall establish me to stand in public places to preach His word for His grace continues forever and ever",
  "Give thanks to God for He is the God who gives me long life for His grace continues forever and ever",
  "Give thanks to God for He is the God who will not leave me to the oppressors for His grace continues forever and ever",
  "Give thanks to God for He is the God who blesses me with heavenly blessings and upon my children too for His grace continues forever and ever",
  "Give thanks to God for He is the God who heals me with everything that Satan has affected me with for His grace continues forever and ever",
  "Give thanks to God for He is the God who blesses me wherever I am for His grace continues forever and ever",
  "Give thanks to God for He is the God who works everything good for me for His grace continues forever and ever",
  "Give thanks to God for He is the God gives new abilities and skills for me for His grace continues forever and ever",
  "Give thanks to God for He is the God who leads me from grace to more abundant grace for His grace continues forever and ever",
  "Give thanks to God for He is the God who justified me as righteous for His grace continues forever and ever",
  "Give thanks to God for He is the God who will never see me as a sinner for His grace continues forever and ever",
  "Give thanks to God for He is the God who breaks forth His light upon me for His grace continues forever and ever",
  "Give thanks to God for He is the God who says Yeah and Amen towards all His promises in my life for His grace continues forever and ever",
  "Give thanks to God for He is the God who takes all my worries upon Himself for His grace continues forever and ever",
  "Give thanks to God for He is the God who maintains my cause for His grace continues forever and ever",
  "Give thanks to God for He is the God who searches the deep things of my heart for His grace continues forever and ever",
  "Give thanks to God for He is the God who lifts me up all the time I fall into Temptations for His grace continues forever and ever",
  "Give thanks to God for He is the God who helps me to forgive seventy seven times or more for His grace continues forever and ever",
  "Give thanks to God for He is God who calls me as an interpreter of visions and dreams for His grace continues forever and ever",
  "Give thanks to God for He is the God who helps me to discern the spirits for His grace continues forever and ever",
  "Give thanks to God for He is the God before whom my prayers are day and night before thine eyes for His grace continues forever and ever",
  "Give thanks to God for He is the God who calls me as the humble servant for His grace continues forever and ever",
  "Give thanks to God for He is the God who shapes me as a faithful servant for His grace continues forever and ever",
  "Give thanks to God for He is the God who makes the Jericho walls fall before me for His grace continues forever and ever",
  "Give thanks to God for He is the God who blesses me to be in His presence always for His grace continues forever and ever",
  "Give thanks to God for He is the God who sends good tidings to me through His angels for His grace continues forever and ever",
  "Give thanks to God for He is the God who gives me the rich people as a support for His grace continues forever and ever",
  "Give thanks to God for He is the God who will make me to stand before the kings for His grace continues forever and ever",
  "Give thanks to God for He is the God who is the sure evidence of my every blessing for His grace continues forever and ever",
  "Give thanks to God for He is the God who keeps my heart steadfast for His grace continues forever and ever",
  "Give thanks to God for He is the God who builds hope where there is no hope for His grace continues forever and ever",
  "Give thanks to God for He is the God who weeps for me for His grace continues forever and ever",
  "Give thanks to God for He is the God who multiplies 1000 times in everything that I acquire from Him for His grace continues forever and ever",
  "Give thanks to God for He is the God who multiplies my ministry as a flock for His grace continues forever and ever",
  "Give thanks to God for He is the God who is the reason for all my blessings for His grace continues forever and ever",
  "Give thanks to God for He is the God who is behind me of every blessing that people see for His grace continues forever and ever",
  "Give thanks to God for He is the God who anoints me above all for His grace continues forever and ever",
  "Give thanks to God for He is the God who helps me to do the things that people have never seen or heard for His grace continues forever and ever",
  "Give thanks to God for He is the God who is there in my every prophecy for His grace continues forever and ever",
  "Give thanks to God for He is the God who helps me to partake in royal dainties for His grace continues forever and ever",
  "Give thanks to God for He is the God who will never take away His hand from upon me for His grace continues forever and ever",
  "Give thanks to God for He is the God who keeps carrying my vision till my end for His grace continues forever and ever",
  "Give thanks to God for He is the God who blesses me to eat all kinds of fruits and foods all my life for His grace continues forever and ever",
  "Give thanks to God for He is the God who will not allow dreadful diseases to come upon me to kill me for His grace continues forever and ever",
  "Give thanks to God for He is the God who keeps my feet from falling into a snare for His grace continues forever and ever",
  "Give thanks to God for He is the God who keeps my body from all sickness and diseases for His grace continues forever and ever",
  "Give thanks to God for He is the God who knows my end for His grace continues forever and ever",
  "Give thanks to God for He is the God who receives my spirit for His grace continues forever and ever",
  "Give thanks to God for He is the God who is the fountain of the living waters for His grace continues forever and ever",
  "Give thanks to God for He is the God who helps me to thirst no more for His grace continues forever and ever",
  "Give thanks to God for He is the God who helps me to weep no more for His grace continues forever and ever",
  "Give thanks to God for He is the God who knows all my secret sins to forgive for His grace continues forever and ever",
  "Give thanks to God for He is the God who blesses me with spiritual gifts every year for His grace continues forever and ever",
  "Give thanks to God for He is the God who keeps me exalting for His grace continues forever and ever",
  "Give thanks to God for He is the God who clears all my debts and gives me peace from all sides for His grace continues forever and ever",
  "Give thanks to God for He is the God who helps me to climb high mountains, enjoy His presence for His grace continues forever and ever",
  "Give thanks to God for He is the God who helps me to travel only Airways for His grace continues forever and ever",
  "Give thanks to God for He is the God who gives me all comfort for His grace continues forever and ever",
  "Give thanks to God for He is the God who makes my life Royal for His grace continues forever and ever",
  "Give thanks to God for He is the God who helps me to grow stronger and stronger day by day for His grace continues forever and ever",
  "Give thanks to God for He is the God who will be with me in coming in and going out for His grace continues forever and ever",
  "Give thanks to God for He is the God who put the words of praise in my mouth for His grace continues forever and ever",
  "Give thanks to God for He is the God who visits my life as El-Elyon for His grace continues forever and ever",
  "Give thanks to God for He is the God who makes my gates as a praise for His grace continues forever and ever",
  "Give thanks to God for He is the God who keeps me at the night watches safe for His grace continues forever and ever",
  "Give thanks to God for He is the God who adores me with his living beauty for His grace continues forever and ever",
  "Give thanks to God for He is the God who helps me to exercise all my talents and gifts for His kingdom for His grace continues forever and ever",
  "Give thanks to God for He is the God who cleanses my heart and makes me pure and clean for His grace continues forever and ever",
  "Give thanks to God for He is the God who calls me righteous for His grace continues forever and ever",
  "Give thanks to God for He is the God who helps me to live a life of all worthiness for His grace continues forever and ever",
  "Give thanks to God for He is the God who helps me to build a house of God as of David for His grace continues forever and ever",
  "Give thanks to God for He is the God who helps me to never break His covenant for His grace continues forever and ever",
  "Give thanks to God for He is the God who wrote my name in the book of life for His grace continues forever and ever",
  "Give thanks to God for He is the God who condemns every tongue that raises against me for His grace continues forever and ever",
  "Give thanks to God for He is the God who helps me to use all privileges and opportunities come along my way for His grace continues forever and ever",
  "Give thanks to God for He is the God who will raise me up from the heap of ashes to make me sit in the places of princes for His grace continues forever and ever",
  "Give thanks to God for He is the God who will bless those whom I impart for His grace continues forever and ever",
  "Give thanks to God for He is the God who blesses those whom I pray for for His grace continues forever and ever",
  "Give thanks to God for He is the God who will be as a shadow in my prayer for His grace continues forever and ever",
  "Give thanks to God for He is the God who is all about me and my life for His grace continues forever and ever",
  "Give thanks to God for He is the God who is Hoshna na – He will deliver us for His grace continues forever and ever",
  "Give thanks to God for He is the God who will help me to plunder my enemies for His grace continues forever and ever",
  "Give thanks to God for He is the God who will give me victory when I plead at His feet for His grace continues forever and ever",
  "Give thanks to God for He is the God to whom I will life up my hands for His grace continues forever and ever",
  "Give thanks to God for He is the God who will make me remain ever green to prosper for His grace continues forever and ever",
  "Give thanks to God for He is the God who has pleased my house to be a blessing forever for His grace continues forever and ever",
  "Give thanks to God for He is the God who helps me to keep fasts and accepts it for His grace continues forever and ever",
  "Give thanks to God for He is the God who honors my prayers offered in His house for His grace continues forever and ever",
  "Give thanks to God for He is the God who will scatter all my enemies in six ways for His grace continues forever and ever",
  "Give thanks to God for He is the God who keeps me from all those who backbite after me for His grace continues forever and ever",
  "Give thanks to God for He is the God who helps me to know the secret things of man for being a prophet for His grace continues forever and ever",
  "Give thanks to God for He is the God who will teach my children for His grace continues forever and ever",
  "Give thanks to God for He is the God who is pleased because He has made me for His grace continues forever and ever",
  "Give thanks to God for He is the God who will keep my path from falling away for His grace continues forever and ever",
  "Give thanks to God for He is the God who will never let accidents happen in my life for His grace continues forever and ever",
  "Give thanks to God for He is who clothes me with the robes of righteousness and Holiness for His grace continues forever and ever",
  "Give thanks to God for He is the God who helps me to grow stronger and stronger day by day for His grace continues forever and ever",
  "Give thanks to God for He is God who will never put me to shame for His grace continues forever and ever",
  "Give thanks to God for He is the God who binds and releases what I bind and releases on this earth for His grace continues forever and ever",
  "Give thanks to God for He is the God who honors my words and confirms them over the people for His grace continues forever and ever",
  "Give thanks to God for He is the God who helps me to open my mouth with wisdom and knowledge for His grace continues forever and ever",
  "Give thanks to God for He is the God who has turned my darkness into light for His grace continues forever and ever",
  "Give thanks to God for He is the God who shines on my face for His grace continues forever and ever",
  "Give thanks to God for He is the God who makes everything new for me for His grace continues forever and ever",
  "Give thanks to God for He is the God who gives me new supporters and new friends who loves me with God’s love for His grace continues forever and ever",
  "Give thanks to God for He is the God who provides me the destiny helpers throughout my life for His grace continues forever and ever",
  "Give thanks to God for He is the God who satisfies my thirst for God for His grace continues forever and ever",
  "Give thanks to God for He is the God who will not prosper any weapon that is formed against me for His grace continues forever and ever",
  "Give thanks to God for He is the God who will resurrect my body and my spirit for His grace continues forever and ever",
  "Give thanks to God for He is the God whom I will see with my own eyes for His grace continues forever and ever",
  "Give thanks to God for He is the God who will help me to pray for millions for His grace continues forever and ever",
  "Give thanks to God for He is the God who will help me to pray for Nations to save and rescue them for His grace continues forever and ever",
  "Give thanks to God for He is the God who will hear my prayers at the time of difficulty for His grace continues forever and ever",
  "Give thanks to God for He is the God who will stop wars in regard to my prayers for His grace continues forever and ever",
  "Give thanks to God for He is the God who will change climate when I pray for His grace continues forever and ever",
  "Give thanks to God for He is the God who will use me as a chosen vessel for the youth for His grace continues forever and ever",
  "Give thanks to God for He is the God who will help me to move nations upside down for His grace continues forever and ever",
  "Give thanks to God for He is the God who will bless me to be a blessing for His grace continues forever and ever",
  "Give thanks to God for He is the God who will carry me in His arms in my darkest times for His grace continues forever and ever",
  "Give thanks to God for He is the God who is the giver of all my possessions for His grace continues forever and ever",
  "Give thanks to God for He is the God who breaks every yoke of iron from off my shoulders for His grace continues forever and ever",
  "Give thanks to God for He is the God who breaks every yoke of wood from off my neck for His grace continues forever and ever",
  "Give thanks to God for He is the God who molds me as an instrument and vessel of mercy for His grace continues forever and ever",
  "Give thanks to God for He is the God who teaches me the revelations through His Spirit for His grace continues forever and ever",
  "Give thanks to God for He is the God who helps me not to go after the world for His grace continues forever and ever",
  "Give thanks to God for He is the God who loves me as His own for His grace continues forever and ever",
  "Give thanks to God for He is the God who pray for me being an intercessor for His grace continues forever and ever",
  "Give thanks to God for He is the God who loves to stand for me for His grace continues forever and ever",
  "Give thanks to God for He is the God who will help my hands to play the instruments for His grace continues forever and ever",
  "Give thanks to God for He is the God who helps me not to lean on my own understanding for His grace continues forever and ever",
  "Give thanks to God for He is the God who helps my heart not to show any partiality for His grace continues forever and ever",
  "Give thanks to God for He is the God who helps me to overcome the pride for His grace continues forever and ever",
  "Give thanks to God for He is the God who teaches me the heart of long suffering for His grace continues forever and ever",
  "Give thanks to God for He is the God who helps me to take right decisions for His grace continues forever and ever",
  "Give thanks to God for He is the God who helps me to stand right before God for His grace continues forever and ever",
  "Give thanks to God for He is the God who strengthens me in my weakness for His grace continues forever and ever",
  "Give thanks to God for He is the God in whom I praise day and night for His grace continues forever and ever",
  "Give thanks to God for He is the God in whom I meditate day and night for His grace continues forever and ever",
  "Give thanks to God for He is the God who will help not to wither and fall for His grace continues forever and ever",
  "Give thanks to God for He is the God who will give me peace in all my borders for His grace continues forever and ever",
  "Give thanks to God for He is the God who hears when I sing for His grace continues forever and ever",
  "Give thanks to God for He is the God who makes my mouth as one of the learned for His grace continues forever and ever",
  "Give thanks to God for He is the God who makes my heart merry for His grace continues forever and ever",
  "Give thanks to God for He is the God who will enable me to offer Gold to Him as an offering for His grace continues forever and ever",
  "Give thanks to God for He is the God who is my possession and my lot for His grace continues forever and ever",
  "Give thanks to God for He is the God who is my beauty for His grace continues forever and ever",
  "Give thanks to God for He is the God who fulfills all the prophecies of my life for His grace continues forever and ever",
  "Give thanks to God for He is the God who has made me as a mouthpiece of God for His grace continues forever and ever",
  "Give thanks to God for He is the God who helps me to reign in dominion and power over the creation for His grace continues forever and ever",
  "Give thanks to God for He is the God who is my fulfilment for His grace continues forever and ever",
  "Give thanks to God for He is the God who honors my faith for His grace continues forever and ever",
  "Give thanks to God for He is the God who shields me with favor for His grace continues forever and ever",
  "Give thanks to God for He is the God who surrounds me as a wall for His grace continues forever and ever",
  "Give thanks to God for He is the God who is in midst of me as my glory for His grace continues forever and ever",
  "Give thanks to God for He is the God who will help me to remain in Him forever and ever for His grace continues forever and ever",
  "Give thanks to God for He is the God who hears my prayers when I lay my hands and pray for His grace continues forever and ever",
  "Give thanks to God for He is the God who covers my head with His glory for His grace continues forever and ever",
  "Give thanks to God for He is the God who has kept my heart always rejoicing for His grace continues forever and ever",
  "Give thanks to God for He is the God who has given me great wisdom to study the word of God for His grace continues forever and ever",
  "Give thanks to God for He is the God who has blessed me to inspire great things and secrets to pen for the generations to come for His grace continues forever and ever",
  "Give thanks to God for He is the God who has filled my mouth with all good things for His grace continues forever and ever",
  "Give thanks to God for He is the God who fills my mouth as I open my mouth wide for His grace continues forever and ever",
  "Give thanks to God for He is the God who will anoint my head with oil to exalt me for His grace continues forever and ever",
  "Give thanks to God for He is the God who will help me not to fear for His grace continues forever and ever",
  "Give thanks to God for He is the God who carries me for His grace continues forever and ever",
  "Give thanks to God for He is the God who helps me to seek the invisible God for His grace continues forever and ever",
  "Give thanks to God for He is the God who will help me to hear His voice with His Holy Spirit for His grace continues forever and ever",
  "Give thanks to God for He is the God whom I will find as I seek Him for His grace continues forever and ever",
  "Give thanks to God for He is the God who will never leave me even for a moment for His grace continues forever and ever",
  "Give thanks to God for He is the God who will always shows the compassion on me for His grace continues forever and ever",
  "Give thanks to God for He is the God who keeps His heart on me for His grace continues forever and ever",
  "Give thanks to God for He is the God who breaks forth all blessings on me for His grace continues forever and ever",
  "Give thanks to God for He is the God who awakens me in the early mornings for His grace continues forever and ever",
  "Give thanks to God for He is the God who instructs my prayer in the morning for His grace continues forever and ever",
  "Give thanks to God for He is the God to whom I direct my prayer in the early morning for His grace continues forever and ever",
  "Give thanks to God for He is the God who gave me the power and authority to cast out demons and evil spirits for His grace continues forever and ever",
  "Give thanks to God for He is the God who gave me the power to heal all sicknesses and diseases for His grace continues forever and ever",
  "Give thanks to God for He is the God who is a shadow at my right hand for His grace continues forever and ever",
  "Give thanks to God for He is the God who blessed my house as one of the righteous for His grace continues forever and ever",
  "Give thanks to God for He is the God who will help me to sing the songs of salvation for His grace continues forever and ever",
  "Give thanks to God for He is the God who will enable me to fulfill all my responsibilities for His grace continues forever and ever",
  "Give thanks to God for He is the God who sees me for His grace continues forever and ever",
  "Give thanks to God for He is the God before whom everything is naked about me for His grace continues forever and ever",
  "Give thanks to God for He is the God who has great plans and thoughts to prosper me and not to harm me for His grace continues forever and ever",
  "Give thanks to God for He is the God who has great thoughts and plans as the earth is higher than the heavens for His grace continues forever and ever",
  "Give thanks to God for He is the God who sees that I accomplish all that He has purposed for me for His grace continues forever and ever",
  "Give thanks to God for He is the God who adds meaning to my life for His grace continues forever and ever",
  "Give thanks to God for He is the God who makes my life fruitful for His grace continues forever and ever",
  "Give thanks to God for He is the God who loves me very much for His grace continues forever and ever",
  "Give thanks to God for He is the God who trusts me always for His grace continues forever and ever",
  "Give thanks to God for He is the God who has designed this life for me for His grace continues forever and ever",
  "Give thanks to God for He is the God who will give me all the nine gifts through the power of the Spirit of God for His grace continues forever and ever",
  "Give thanks to God for He is the God who enables me to bring souls to the Kingdom of God for His grace continues forever and ever",
  "Give thanks to God for He is the God who enables me to sit at the right hand of God for His grace continues forever and ever",
  "Give thanks to God for He is the God who helps me to crush all the enemies under my feet for His grace continues forever and ever",
  "Give thanks to God for He is the God who helps me to have victory over the death for His grace continues forever and ever",
  "Give thanks to God for He is the God who fulfills all my desires throughout my generations for His grace continues forever and ever",
  "Give thanks to God for He is the God who helps my generations to continue until He returns for His grace continues forever and ever",
  "Give thanks to God for He is the God who will enable me to see my Children’s children for His grace continues forever and ever",
  "Give thanks to God for He is the God who fulfils my prayers in my children’s life too for His grace continues forever and ever",
  "Give thanks to God for He is God who will continue even more greater blessings towards all the generations for His grace continues forever and ever",
  "Give thanks to God for He is the God who will declare every blessing on my children’s children too for His grace continues forever and ever",
  "Give thanks to God for He is the God who is my shoulder where I can take support for His grace continues forever and ever",
  "Give thanks to God for He is the God who restores everything I lost for His grace continues forever and ever",
  "Give thanks to God for He is the God who is my Shekinah glory for His grace continues forever and ever",
  "Give thanks to God for He is the God who is the answer of my every failure for His grace continues forever and ever",
  "Give thanks to God for He is the God who is the helper in the times of my need for His grace continues forever and ever",
  "Give thanks to God for He is the God who helps me not to wither and fall for His grace continues forever and ever",
  "Give thanks to God for He is the God who keeps me always above all for His grace continues forever and ever",
  "Give thanks to God for He is the God who keeps me in greater heights for His grace continues forever and ever",
  "Give thanks to God for He is the God who has drunk the cup of suffering for me for His grace continues forever and ever",
  "Give thanks to God for He is the God who has been slaughtered for my sins for His grace continues forever and ever",
  "Give thanks to God for He is the God who has become poor to make me rich for His grace continues forever and ever",
  "Give thanks to God for He is the God who has showered upon me the showers of blessings for His grace continues forever and ever",
  "Give thanks to God for He is the God who extends the borders of my ministry for His grace continues forever and ever",
  "Give thanks to God for He is the God who has given me divine wisdom, knowledge and understanding for His grace continues forever and ever",
  "Give thanks to God for He is the God who is my courage for His grace continues forever and ever",
  "Give thanks to God for He is the God in whom I meditate all night for His grace continues forever and ever",
  "Give thanks to God for He is the God who turns my darkness into great light for His grace continues forever and ever",
  "Give thanks to God for He is the God who created me fearfully and wonderfully for His grace continues forever and ever",
  "Give thanks to God for He is the God who has blessed me with the gift of prophecy for His grace continues forever and ever",
  "Give thanks to God for He is the God who gives me overflowing abundance for His grace continues forever and ever",
  "Give thanks to God for He is the God in whom I trust all times for His grace continues forever and ever",
  "Give thanks to God for He is the God by whom I am called out by thy great name for His grace continues forever and ever",
  "Give thanks to God for He is the God who has sealed me in His Spirit for His grace continues forever and ever",
  "Give thanks to God for He is the God who is with me in all my fears for His grace continues forever and ever",
  "Give thanks to God for He is the God who helps me in my troubles for His grace continues forever and ever",
  "Give thanks to God for He is the God who commands His angels for me for His grace continues forever and ever",
  "Give thanks to God for He is the God whose love is so deep for His grace continues forever and ever",
  "Give thanks to God for He is the God who reveals His secrets to me for His grace continues forever and ever",
  "Give thanks to God for He is the God who helps me to know the covenant to me for His grace continues forever and ever",
  "Give thanks to God for He is the God who loves to have fellowship with me for His grace continues forever and ever",
  "Give thanks to God for He is the God who pours out His spirit as a fire upon me for His grace continues forever and ever",
  "Give thanks to God for He is the God who has given me the prophetic anointing for His grace continues forever and ever",
  "Give thanks to God for He is the God who gives me the gold and the silver for His grace continues forever and ever",
  "Give thanks to God for He is the God who builds my life with precious stones for His grace continues forever and ever",
  "Give thanks to God for He is the God who supplies all my needs for His grace continues forever and ever",
  "Give thanks to God for He is the God who accepts my prayers as an incense for His grace continues forever and ever",
  "Give thanks to God for He is the God who rewards me for all my labour for His grace continues forever and ever",
  "Give thanks to God for He is the God who embraces me with His love for His grace continues forever and ever",
  "Give thanks to God for He is the God who waits for me for His grace continues forever and ever",
  "Give thanks to God for He is the God whose Spirit rests upon me for His grace continues forever and ever",
  "Give thanks to God for He is the God who loves me forever for His grace continues forever and ever",
  "Give thanks to God for He is the God who writes the word on the tablets of my heart for His grace continues forever and ever",
  "Give thanks to God for He is the God who is for me for His grace continues forever and ever",
  "Give thanks to God for He is the God who heals my broken heart for His grace continues forever and ever",
  "Give thanks to God for He is the God who binds all my wounds for His grace continues forever and ever",
  "Give thanks to God for He is the God who builds all my desolate and waste places for His grace continues forever and ever",
  "Give thanks to God for He is the God who makes me rich for His grace continues forever and ever",
  "Give thanks to God for He is the God who gives me greater possessions for His grace continues forever and ever",
  "Give thanks to God for He is the God who enables me to drink Nations wealth for His grace continues forever and ever",
  "Give thanks to God for He is the God who makes me more than conquerors for His grace continues forever and ever",
  "Give thanks to God for He is the God who makes my name great for His grace continues forever and ever",
  "Give thanks to God for He is the God who blesses those who bless me for His grace continues forever and ever",
  "Give thanks to God for He is the God who curses those who curse me for His grace continues forever and ever",
  "Give thanks to God for He is the God who is going to make me great for His grace continues forever and ever",
  "Give thanks to God for He is the God who answers my prayers for His grace continues forever and ever",
  "Give thanks to God for He is the God who gives me the desires of my heart for His grace continues forever and ever",
  "Give thanks to God for He is the God who grants all my petitions for His grace continues forever and ever",
  "Give thanks to God for He is the God who helps to be an overcomer for His grace continues forever and ever",
  "Give thanks to God for He is the God who vindicates me for His grace continues forever and ever",
  "Give thanks to God for He is the God who helps me to forgive my enemies for His grace continues forever and ever",
  "Give thanks to God for He is the God who teaches my fingers to war against my enemies for His grace continues forever and ever",
  "Give thanks to God for He is the God who shows mercy on me forever to ever for His grace continues forever and ever",
  "Give thanks to God for He is the God by whom I live for His grace continues forever and ever",
  "Give thanks to God for He is the God who is the lifter of my head for His grace continues forever and ever",
  "Give thanks to God for He is the God who is my shield and my shelter for His grace continues forever and ever",
  "Give thanks to God for He is the God to whom I worship for His grace continues forever and ever",
  "Give thanks to God for He is the God who is my love for His grace continues forever and ever",
  "Give thanks to God for He is the God who takes care of me when I am old for His grace continues forever and ever",
  "Give thanks to God for He is the God who gives me visions for His grace continues forever and ever",
  "Give thanks to God for He is the God who lives in me for His grace continues forever and ever",
  "Give thanks to God for He is the God by whom I am planted on this earth for His grace continues forever and ever",
  "Give thanks to God for He is the God by whom am I established for His grace continues forever and ever",
  "Give thanks to God for He is the God who gives me the Spirit without measure for His grace continues forever and ever",
  "Give thanks to God for He is the God who sets me over everyone for His grace continues forever and ever",
  "Give thanks to God for He is the God who exalts me for His grace continues forever and ever",
  "Give thanks to God for He is the God who has blessed the work of my hands for His grace continues forever and ever",
  "Give thanks to God for He is the God who gives me the increase as fishes of the sea for His grace continues forever and ever",
  "Give thanks to God for He is the God who is lifter of my soul for His grace continues forever and ever",
  "Give thanks to God for He is the God who is my breath for His grace continues forever and ever",
  "Give thanks to God for He is the God who speaks to me daily for His grace continues forever and ever",
  "Give thanks to God for He is the God who has not withhold His goodness towards me for His grace continues forever and ever",
  "Give thanks to God for He is the God who has shown His loving kindness always for His grace continues forever and ever",
  "Give thanks to God for He is the God who is my husband for His grace continues forever and ever",
  "Give thanks to God for He is the God who is my deliverer for His grace continues forever and ever",
  "Give thanks to God for He is the God who is gentle and patient towards me for His grace continues forever and ever",
  "Give thanks to God for He is the God who is longsuffering towards me for His grace continues forever and ever",
  "Give thanks to God for He is who has called me out of slavery for His grace continues forever and ever",
  "Give thanks to God for He is the God who fulfills all His promises towards me for His grace continues forever and ever",
  "Give thanks to God for He is the God who is my ruler for His grace continues forever and ever",
  "Give thanks to God for He is the God who is my Prophet for His grace continues forever and ever",
  "Give thanks to God for He is the God who has blessed me with the Children for His grace continues forever and ever",
  "Give thanks to God for He is the God who has called me as Mother on this earth for His grace continues forever and ever",
  "Give thanks to God for He is the God who has blessed my womb with the children for His grace continues forever and ever",
  "Give thanks to God for He is the God who is my marriage covenants for His grace continues forever and ever",
  "Give thanks to God for He is the God who is the witness of my marriage for His grace continues forever and ever",
  "Give thanks to God for He is the God who gave me this life as a gift for His grace continues forever and ever",
  "Give thanks to God for He is the God who will show His sure mercies to me for His grace continues forever and ever",
  "Give thanks to God for He is the God you will lead me to the still waters for His grace continues forever and ever",
  "Give thanks to God for He is the God who makes my head overflow with oil for His grace continues forever and ever",
  "Give thanks to God for He is my God your mercy and goodness will follow me all the days of my life. for His grace continues forever and ever",
  "Give thanks to God for He is my God who have crowned me with divine favor for His grace continues forever and ever",
  "Give thanks to God for He is the God whom I serve as long as I live for His grace continues forever and ever",
  "Give thanks to God for He is the God who has formed me in my mother’s womb for His grace continues forever and ever",
  "Give thanks to God for He is my God who directs my path for His grace continues forever and ever",
  "Give thanks to God for He is the God who makes my crooked path straight for His grace continues forever and ever",
  "Give thanks to God for He is the God who instructs me for His grace continues forever and ever",
  "Give thanks to God for He is the God to whom every knee shall bow for His grace continues forever and ever",
  "Give thanks to God for He is the God standing among the lights of the lampstand for His grace continues forever and ever",
  "Give thanks to God for He is the God who has made me as a light to the world for His grace continues forever and ever",
  "Give thanks to God for He is the God who will fight all my battles for His grace continues forever and ever",
  "Give thanks to God for He is the God who will change my wilderness into the streams of the Living Waters for His grace continues forever and ever",
  "Give thanks to God for He is the God who cares for me for His grace continues forever and ever",
  "Give thanks to God for He is the God who loves me with an everlasting love for His grace continues forever and ever",
  "Give thanks to God for He is the God who is my source alone for His grace continues forever and ever",
  "Give thanks to God for He is the God who gives me a name of praise and honor for His grace continues forever and ever",
  "Give thanks to God for He is the God who looks down on me from the Heaven. for His grace continues forever and ever",
  "Give thanks to God for He is the God who has prepared the place of Mansion for me in the heaven for His grace continues forever and ever",
  "Give thanks to God for He is the God who has called me saying you are mine for His grace continues forever and ever",
  "Give thanks to God for He is the God who has blessed me with your divine purpose for His grace continues forever and ever",
  "Give thanks to God for He is the God who is my Wisdom for His grace continues forever and ever",
  "Give thanks to God for He is the God who gives me the ability to earn wealth for His grace continues forever and ever",
  "Give thanks to God for He is the God who accepts my prayers and receives my supplications for His grace continues forever and ever",
  "Give thanks to God for He is the God who has called me as the prophet to the Nations for His grace continues forever and ever",
  "Give thanks to God for He is the God who has anointed me with the oil of God for His grace continues forever and ever",
  "Give thanks to God for He is the God who has blessed me with the anointing of the God for His grace continues forever and ever",
  "Give thanks to God for He is the God who has blessed me with divine gifts for His grace continues forever and ever",
  "Give thanks to God for He is the God who has blessed me with all the heavenly blessings. for His grace continues forever and ever",
  "Give thanks to God for He is the God who has prospered me with His will. for His grace continues forever and ever",
  "Give thanks to God for He is the God who has ordained me to bear the fruit always for His grace continues forever and ever",
  "Give thanks to God for He is the God who collects my tears in the bottle for His grace continues forever and ever",
  "Give thanks to God for He is the God who gives me victory for His grace continues forever and ever",
  "Give thanks to God for He is the God who gives me the honor among all men for His grace continues forever and ever",
  "Give thanks to God for He is the God who gives me great favor in the sight of all people for His grace continues forever and ever",
  "Give thanks to God for He is the God who loves me more than anything that He gave His precious life for me. for His grace continues forever and ever",
  "Give thanks to God for He is the God who is my sword for His grace continues forever and ever",
  "Give thanks to God for He is the God who is my everlasting God for His grace continues forever and ever",
  "Give thanks to God for He is the God who corrects me for His grace continues forever and ever",
  "Give thanks to God for He is the God who instructs me and teaches me for His grace continues forever and ever",
  "Give thanks to God for He is the God who acts according to my faith for His grace continues forever and ever",
  "Give thanks to God for He is the God who knows me for His grace continues forever and ever",
  "Give thanks to God for He is the God who remembers me for His grace continues forever and ever",
  "Give thanks to God for He is the God who comforts me for His grace continues forever and ever",
  "Give thanks to God for He is the God who is my light for His grace continues forever and ever",
  "Give thanks to God for He is the God who is my glory for His grace continues forever and ever",
  "Give thanks to God for He is the God who gives the witness on my behalf for His grace continues forever and ever"
];

// Category mapping for better filtering
const praiseCategories = {
  worship: [
    "True God", "Most High", "King of Kings", "Lord of Lords", "Alpha and Omega", 
    "First and the Last", "Jehovah", "El-Shaddai", "Ha-Elyon", "Creator", "Living God",
    "Holy Spirit", "Son of God", "Word", "Light", "Way, truth and the life"
  ],
  thanksgiving: [
    "thank", "thanks", "grace", "mercy", "merciful", "faithfulness", "goodness", 
    "loving kindness", "compassion", "new mercies"
  ],
  victory: [
    "victory", "breakthrough", "overcome", "conqueror", "defeat", "enemies", 
    "battles", "war", "plunder", "weapons formed against me"
  ],
  love: [
    "love", "beloved", "adore", "everlasting love", "compassion", "mercy", 
    "kindness", "patient", "longsuffering", "gentle"
  ],
  power: [
    "power", "strength", "almighty", "mighty", "miracles", "wonders", "great things",
    "authority", "dominion", "more than conquerors"
  ],
  peace: [
    "peace", "comfort", "refuge", "strength", "helper", "shadow", "still waters",
    "comforter", "calm", "rest", "solace"
  ],
  healing: [
    "heal", "healing", "restore", "restoration", "wounds", "broken heart", 
    "diseases", "sickness", "Jehovah Rapha", "make whole"
  ],
  provision: [
    "provide", "provision", "bless", "blessing", "wealth", "rich", "abundance", 
    "Jehovah Jireh", "needs", "supplies", "increase", "prosper"
  ],
  guidance: [
    "guide", "guidance", "wisdom", "understanding", "knowledge", "direct", 
    "path", "way maker", "instruct", "teach", "revelation"
  ],
  protection: [
    "protect", "protection", "shield", "safety", "guard", "defend", "fortress", 
    "stronghold", "refuge", "preserve", "keep", "safeguard"
  ]
};

// Generate additional praises if needed (optional)
const generateMorePraises = () => {
  const additionalPraises = [];
  // Only generate if we need more than base (currently we have ~400+ base praises)
  // For now, we'll just return empty array since base is sufficient
  return additionalPraises;
};

const allBasePraises = [...basePraises, ...generateMorePraises()];

export default function PraisesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [visibleCount, setVisibleCount] = useState(50)

  // Categorize praises
  const categorizePraise = (praise) => {
    if (selectedCategory === "all") return true;
    
    const lowerPraise = praise.toLowerCase();
    const keywords = praiseCategories[selectedCategory] || [];
    
    return keywords.some(keyword => 
      lowerPraise.includes(keyword.toLowerCase())
    );
  };

  // Filter praises based on search and category
  const filteredPraises = useMemo(() => {
    let result = allBasePraises;
    
    // Apply category filter
    if (selectedCategory !== "all") {
      result = result.filter(categorizePraise);
    }
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(praise => 
        praise.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return result;
  }, [searchTerm, selectedCategory]);

  // Categories with dynamic counts
  const categories = [
    { value: "all", label: "All Praises", count: allBasePraises.length },
    { value: "worship", label: "Worship & Adoration", count: allBasePraises.filter(p => categorizePraiseWithCategory(p, "worship")).length },
    { value: "thanksgiving", label: "Thanksgiving", count: allBasePraises.filter(p => categorizePraiseWithCategory(p, "thanksgiving")).length },
    { value: "victory", label: "Victory & Breakthrough", count: allBasePraises.filter(p => categorizePraiseWithCategory(p, "victory")).length },
    { value: "love", label: "Love & Mercy", count: allBasePraises.filter(p => categorizePraiseWithCategory(p, "love")).length },
    { value: "power", label: "Power & Strength", count: allBasePraises.filter(p => categorizePraiseWithCategory(p, "power")).length },
    { value: "peace", label: "Peace & Comfort", count: allBasePraises.filter(p => categorizePraiseWithCategory(p, "peace")).length },
    { value: "healing", label: "Healing & Restoration", count: allBasePraises.filter(p => categorizePraiseWithCategory(p, "healing")).length },
    { value: "provision", label: "Provision & Blessing", count: allBasePraises.filter(p => categorizePraiseWithCategory(p, "provision")).length },
    { value: "guidance", label: "Guidance & Wisdom", count: allBasePraises.filter(p => categorizePraiseWithCategory(p, "guidance")).length },
    { value: "protection", label: "Protection & Safety", count: allBasePraises.filter(p => categorizePraiseWithCategory(p, "protection")).length },
  ];

  function categorizePraiseWithCategory(praise, category) {
    const lowerPraise = praise.toLowerCase();
    const keywords = praiseCategories[category] || [];
    return keywords.some(keyword => lowerPraise.includes(keyword.toLowerCase()));
  }

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 50, filteredPraises.length));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navigation />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">1000 Praises</h1>
          <p className="text-xl mb-8">
            A collection of heartfelt praises and worship expressions to glorify our Almighty God
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Star className="w-8 h-8 text-yellow-200" />
            <Crown className="w-10 h-10 text-yellow-200" />
            <Star className="w-8 h-8 text-yellow-200" />
          </div>
        </div>
      </section>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="w-6 h-6 text-yellow-600" />
              <span>Search Praises</span>
            </CardTitle>
            <CardDescription>Find the perfect praise for your heart's expression of worship</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search praises..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button 
                className="bg-yellow-600 hover:bg-yellow-700"
                onClick={() => {}} // Search is live, so this can be empty
              >
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Praise Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Card
                key={category.value}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedCategory === category.value ? "ring-2 ring-yellow-500 bg-yellow-50" : ""
                }`}
                onClick={() => {
                  setSelectedCategory(category.value);
                  setVisibleCount(50); // Reset visible count when changing category
                }}
              >
                <CardContent className="pt-4 pb-4 text-center">
                  <h3 className="font-semibold text-sm mb-2">{category.label}</h3>
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    {category.count}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Praises Grid */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedCategory !== "all" ? categories.find(c => c.value === selectedCategory)?.label : "All Praises"} 
              {searchTerm && ` - Search Results`}
              <span className="text-base font-normal ml-2">({filteredPraises.length})</span>
            </h2>
            <Badge variant="outline" className="text-lg px-4 py-2">
              {filteredPraises.length} praises found
            </Badge>
          </div>
          
          {filteredPraises.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No praises found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPraises.slice(0, visibleCount).map((praise, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                          <Heart className="w-4 h-4 text-yellow-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-800 font-medium group-hover:text-yellow-600 transition-colors">
                          {praise}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Praise #{index + 1}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          {visibleCount < filteredPraises.length && (
            <div className="text-center mt-8">
              <Button
                variant="outline"
                className="border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white bg-transparent"
                onClick={loadMore}
              >
                Load More Praises ({filteredPraises.length - visibleCount} remaining)
              </Button>
            </div>
          )}
        </div>
        
        {/* Featured Praises */}
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-yellow-800">
              <Crown className="w-6 h-6" />
              <span>Featured Daily Praises</span>
            </CardTitle>
            <CardDescription className="text-yellow-700">
              Special praises for today's worship and meditation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-yellow-800">Morning Praises</h4>
                <div className="space-y-2">
                  <p className="text-yellow-700 italic">"Thank You Lord for this new day"</p>
                  <p className="text-yellow-700 italic">"Your mercies are new every morning"</p>
                  <p className="text-yellow-700 italic">"Great is Your faithfulness"</p>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-yellow-800">Evening Praises</h4>
                <div className="space-y-2">
                  <p className="text-yellow-700 italic">"Blessed be Your name forever"</p>
                  <p className="text-yellow-700 italic">"Thank You for Your protection today"</p>
                  <p className="text-yellow-700 italic">"Glory to God in the highest"</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Call to Action */}
        <div className="text-center mt-12">
          <Card className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white border-0">
            <CardContent className="pt-8 pb-8">
              <h3 className="text-2xl font-bold mb-4">Join Our Daily Praise & Worship</h3>
              <p className="text-lg mb-6 opacity-90">
                Experience the power of corporate praise in our daily online services
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-yellow-600 hover:bg-gray-100 font-semibold">
                  Join Online Service
                </Button>
                <Link href="/prayer-request">
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-yellow-600 font-semibold bg-transparent"
                  >
                    Submit Prayer Request
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}