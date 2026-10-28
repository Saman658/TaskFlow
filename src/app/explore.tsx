import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function ExploreScreen() {
    const router = useRouter();

    return (
        <View style={styles.mainContainer}>
            <ScrollView 
                style={styles.container}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Analytics Overview 📊</Text>
                    <Text style={styles.headerSubtitle}>Real-time performance & trends</Text>
                </View>

                {/* Key Metrics Cards */}
                <View style={styles.statsRow}>
                    <View style={styles.statCard}>
                        <Text style={styles.statLabel}>Total Views</Text>
                        <Text style={styles.statValue}>12.4K</Text>
                        <Text style={styles.greenText}>+18.2%</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statLabel}>Engagement</Text>
                        <Text style={styles.statValue}>84.6%</Text>
                        <Text style={styles.greenText}>+5.4%</Text>
                    </View>
                </View>

                {/* Analytics Chart Container */}
                <View style={styles.chartCard}>
                    <Text style={styles.chartTitle}>Weekly Traffic Activity</Text>

                    {/* Web-Safe Line Chart View with Numbering */}
                    <View style={styles.chartArea}>
                        {/* Y-Axis Guidelines */}
                        <View style={styles.gridLine} />
                        <View style={styles.gridLine} />
                        <View style={styles.gridLine} />

                        {/* Bar/Line Highlighting with Numbers */}
                        <View style={styles.barsContainer}>
                            {[
                                { num: '1', val: '40%' },
                                { num: '2', val: '65%' },
                                { num: '3', val: '30%' },
                                { num: '4', val: '85%' },
                                { num: '5', val: '55%' },
                                { num: '6', val: '90%' },
                                { num: '7', val: '70%' },
                            ].map((item, index) => (
                                <View key={index} style={styles.barColumn}>
                                    <View style={styles.barBackground}>
                                        <View style={[styles.barFill, { height: item.val as any }]} />
                                    </View>
                                    <Text style={styles.dayLabel}>{item.num}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>

                {/* Recent Activities List */}
                <Text style={styles.sectionTitle}>Recent Insights</Text>
                <View style={styles.insightCard}>
                    <Text style={styles.insightTitle}>📈 Peak Activity</Text>
                    <Text style={styles.insightDesc}>Point 6 saw the highest user retention rate this week at 90%.</Text>
                </View>
                <View style={styles.insightCard}>
                    <Text style={styles.insightTitle}>🎯 Goal Reached</Text>
                    <Text style={styles.insightDesc}>Monthly views target exceeded by 2.4k views.</Text>
                </View>
            </ScrollView>

            {/* Bottom Tab Navigation */}
            <View style={styles.bottomTabBar}>
                <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/home' as any)}>
                    <Text style={styles.tabIcon}>🏠</Text>
                    <Text style={styles.tabLabel}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/notifications' as any)}>
                    <Text style={styles.tabIcon}>🔔</Text>
                    <Text style={styles.tabLabel}>Alerts</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/explore' as any)}>
                    <Text style={styles.tabIcon}>🔍</Text>
                    <Text style={[styles.tabLabel, { color: '#0a84ff' }]}>Explore</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/profile' as any)}>
                    <Text style={styles.tabIcon}>👤</Text>
                    <Text style={styles.tabLabel}>Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#0f0f12',
    },
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
    scrollContent: {
        paddingTop: 40,
        paddingBottom: 100,
    },
    header: {
        marginBottom: 20,
    },
    headerTitle: {
        color: '#ffffff',
        fontSize: 22,
        fontWeight: 'bold',
    },
    headerSubtitle: {
        color: '#8e8e93',
        fontSize: 13,
        marginTop: 4,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    statCard: {
        width: '48%',
        backgroundColor: '#1c1c1e',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#2c2c2e',
    },
    statLabel: {
        color: '#8e8e93',
        fontSize: 12,
    },
    statValue: {
        color: '#ffffff',
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 4,
    },
    greenText: {
        color: '#34c759',
        fontSize: 12,
        fontWeight: '600',
    },
    chartCard: {
        backgroundColor: '#1c1c1e',
        padding: 16,
        borderRadius: 14,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#2c2c2e',
    },
    chartTitle: {
        color: '#ffffff',
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 16,
    },
    chartArea: {
        height: 180,
        justifyContent: 'flex-end',
        position: 'relative',
    },
    gridLine: {
        position: 'relative',
        borderBottomWidth: 1,
        borderBottomColor: '#2c2c2e',
        height: 40,
        width: '100%',
    },
    barsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        height: 140,
        width: '100%',
        position: 'absolute',
        bottom: 20,
        paddingHorizontal: 8,
    },
    barColumn: {
        alignItems: 'center',
        flex: 1,
    },
    barBackground: {
        width: 14,
        height: 100,
        backgroundColor: '#2c2c2e',
        borderRadius: 7,
        justifyContent: 'flex-end',
        overflow: 'hidden',
    },
    barFill: {
        width: '100%',
        backgroundColor: '#0a84ff',
        borderRadius: 7,
    },
    dayLabel: {
        color: '#8e8e93',
        fontSize: 11,
        marginTop: 6,
    },
    sectionTitle: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 12,
    },
    insightCard: {
        backgroundColor: '#1c1c1e',
        padding: 14,
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#2c2c2e',
    },
    insightTitle: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 4,
    },
    insightDesc: {
        color: '#8e8e93',
        fontSize: 12,
    },
    bottomTabBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#1c1c1e',
        height: 70,
        paddingBottom: 20,
        borderTopWidth: 1,
        borderTopColor: '#2c2c2e',
        zIndex: 10,
    },
    tabItem: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabIcon: {
        fontSize: 18,
        marginBottom: 2,
    },
    tabLabel: {
        color: '#8e8e93',
        fontSize: 11,
    },
})